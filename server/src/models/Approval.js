const mongoose = require("mongoose");

const ApprovalSchema = new mongoose.Schema({
  expenseId: { type: mongoose.Schema.Types.ObjectId, ref: "Expense", required: true },
  approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stepNumber: { type: Number, required: true },
  status: { type: String, enum: ["pending","approved","rejected","skipped"], default: "pending" },
  comment: String,
  decidedAt: Date,
  active: { type: Boolean, default: false } // only active approvals can be acted upon
}, { timestamps: true });

module.exports = mongoose.model("Approval", ApprovalSchema);
