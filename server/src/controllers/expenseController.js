const Expense = require("../models/Expense");
const ApprovalFlow = require("../models/ApprovalFlow");
const { getExchangeRate } = require("../services/exchangeService");
const { extractTextFromImage } = require("../microservices/ocrService");
const approvalService = require("../services/approvalService");

exports.submitExpense = async (req, res) => {
  try {
    const { amount, currency, category, description, date, approvalFlowId } = req.body;
    const companyId = req.user.companyId;

    const rate = await getExchangeRate(currency, companyId);
    const exchangedAmount = (rate && rate > 0) ? amount * rate : amount;

    let ocrText = "";
    if (req.file) {
      ocrText = await extractTextFromImage(req.file.path);
    }

    // determine which approval flow to use
    let chosenFlowId = approvalFlowId;
    if (!chosenFlowId) {
      const defaultFlow = await ApprovalFlow.findOne({ companyId }).sort({ createdAt: 1 });
      chosenFlowId = defaultFlow ? defaultFlow._id : null;
    }

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
      receipts: req.file ? [{ url: `/uploads/receipts/${req.file.filename}`, storageId: req.file.filename }] : [],
      approvalFlowId: chosenFlowId
    });

    // create approvals if flow exists
    if (chosenFlowId) {
      await approvalService.createApprovalsForExpense(expense);
    } else {
      // no flow -> mark approved by default
      await Expense.findByIdAndUpdate(expense._id, { status: 'approved' });
    }

    res.status(201).json(expense);
  } catch (err) {
    console.error("submitExpense err:", err);
    res.status(500).json({ message: "Failed to submit expense", error: err.message });
  }
};
