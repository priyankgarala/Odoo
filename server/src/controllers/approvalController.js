const Approval = require("../models/Approval");
const Expense = require("../models/Expense");
const approvalService = require("../services/approvalService");

exports.decide = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { decision, comment } = req.body; // decision: 'approved' or 'rejected'
    if (!['approved','rejected'].includes(decision)) return res.status(400).json({ message: "Invalid decision" });

    // find active approval for this user and expense
    const approval = await Approval.findOne({ expenseId, approverId: req.user._id, active: true, status: 'pending' });
    if (!approval) return res.status(403).json({ message: "No pending approval found for you on this expense" });

    approval.status = decision;
    approval.comment = comment;
    approval.decidedAt = new Date();
    approval.active = false;
    await approval.save();

    if (decision === 'rejected') {
      // finalize expense rejected (policy: immediate reject)
      await Expense.findByIdAndUpdate(expenseId, { status: 'rejected' });
      // mark remaining pending approvals as skipped
      await Approval.updateMany({ expenseId, status: 'pending' }, { $set: { status: 'skipped', active: false }});
      return res.json({ message: "Expense rejected" });
    }

    // If approved, run orchestration to see if flow finishes or next step activates
    await approvalService.onApprovalDecision(approval._id);

    // If orchestration marks expense approved, you might want to fetch new status and return
    const expense = await Expense.findById(expenseId);
    return res.json({ message: "Decision recorded", expenseStatus: expense.status });
  } catch (err) {
    console.error("Approval decide err:", err);
    res.status(500).json({ message: "Failed to record decision", error: err.message });
  }
};
