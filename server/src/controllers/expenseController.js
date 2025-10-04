const Expense = require("../models/Expense");
const ApprovalFlow = require("../models/ApprovalFlow");
const { getExchangeRate } = require("../services/exchangeService");
const { extractTextFromImage } = require("../microservices/ocrService");
const approvalService = require("../services/approvalService");

/**
 * @desc    Create a new expense (Employee)
 * @route   POST /api/expenses
 * @access  Employee
 */
exports.createExpense = async (req, res) => {
  try {
    const { amount, currency, category, description, date, approvalFlowId } = req.body;
    const companyId = req.user.companyId;

    // Get exchange rate
    const rate = await getExchangeRate(currency, companyId);
    const exchangedAmount = rate && rate > 0 ? amount * rate : amount;

    // Extract text from receipt image
    let ocrText = "";
    if (req.file) {
      ocrText = await extractTextFromImage(req.file.path);
    }

    // Determine approval flow
    let chosenFlowId = approvalFlowId;
    if (!chosenFlowId) {
      const defaultFlow = await ApprovalFlow.findOne({ companyId }).sort({ createdAt: 1 });
      chosenFlowId = defaultFlow ? defaultFlow._id : null;
    }

    // Create expense
    const expense = await Expense.create({
      companyId,
      createdBy: req.user._id,
      amountOriginal: amount,
      currencyOriginal: currency,
      exchangedAmount,
      exchangeRate: rate,
      category,
      description: description || ocrText,
      date,
      receipts: req.file
        ? [
            {
              url: `/uploads/receipts/${req.file.filename}`,
              storageId: req.file.filename,
            },
          ]
        : [],
      approvalFlowId: chosenFlowId,
      status: "pending",
    });

    // Handle approvals
    if (chosenFlowId) {
      await approvalService.createApprovalsForExpense(expense);
    } else {
      await Expense.findByIdAndUpdate(expense._id, { status: "approved" });
    }

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (err) {
    console.error("createExpense err:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create expense",
      error: err.message,
    });
  }
};

/**
 * @desc    Get all expenses (Employee, Manager, Admin)
 * @route   GET /api/expenses
 * @access  Employee, Manager, Admin
 */
exports.getExpenses = async (req, res) => {
  try {
    const { role, companyId, _id } = req.user;
    let query = { companyId };

    if (role === "Employee") {
      query.createdBy = _id; // Employee sees only their own
    }

    const expenses = await Expense.find(query)
      .populate("createdBy", "name email role")
      .populate("approvalFlowId");

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (err) {
    console.error("getExpenses err:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
      error: err.message,
    });
  }
};

/**
 * @desc    Get expense by ID
 * @route   GET /api/expenses/:id
 * @access  Employee, Manager, Admin
 */
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id)
      .populate("createdBy", "name email role")
      .populate("approvalFlowId");

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const { role, _id, companyId } = req.user;

    // Access control
    if (role === "Employee" && expense.createdBy._id.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this expense",
      });
    }

    if (expense.companyId.toString() !== companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view expenses from another company",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (err) {
    console.error("getExpenseById err:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expense",
      error: err.message,
    });
  }
};
