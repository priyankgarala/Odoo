const Approval = require("../models/Approval");
const Expense = require("../models/Expense");
const approvalService = require("../services/approvalService");

/**
 * @desc    Get all pending approvals for the logged-in user
 * @route   GET /api/approvals/pending
 * @access  Manager, Admin
 */
exports.getPendingApprovals = async (req, res) => {
  try {
    const approverId = req.user._id;

    const pendingApprovals = await Approval.find({
      approverId,
      active: true,
      status: "pending",
    })
      .populate("expenseId", "category amountOriginal currencyOriginal createdBy status")
      .populate("companyId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pendingApprovals.length,
      approvals: pendingApprovals,
    });
  } catch (err) {
    console.error("getPendingApprovals err:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending approvals",
      error: err.message,
    });
  }
};

/**
 * @desc    Decide on an expense approval
 * @route   POST /api/approvals/:expenseId/decision
 * @access  Manager, Admin
 */
exports.decideApproval = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { decision, comment } = req.body; // decision: 'approved' or 'rejected'

    if (!["approved", "rejected"].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }

    // Find active approval for this user and expense
    const approval = await Approval.findOne({
      expenseId,
      approverId: req.user._id,
      active: true,
      status: "pending",
    });

    if (!approval) {
      return res.status(403).json({
        success: false,
        message: "No pending approval found for you on this expense",
      });
    }

    // Update approval status
    approval.status = decision;
    approval.comment = comment || "";
    approval.decidedAt = new Date();
    approval.active = false;
    await approval.save();

    if (decision === "rejected") {
      // Immediate reject policy
      await Expense.findByIdAndUpdate(expenseId, { status: "rejected" });

      // Mark remaining pending approvals as skipped
      await Approval.updateMany(
        { expenseId, status: "pending" },
        { $set: { status: "skipped", active: false } }
      );

      return res.json({
        success: true,
        message: "Expense rejected",
      });
    }

    // Handle approval orchestration for next step
    await approvalService.onApprovalDecision(approval._id);

    const expense = await Expense.findById(expenseId);

    res.json({
      success: true,
      message: "Decision recorded",
      expenseStatus: expense.status,
    });
  } catch (err) {
    console.error("decideApproval err:", err);
    res.status(500).json({
      success: false,
      message: "Failed to record decision",
      error: err.message,
    });
  }
};
