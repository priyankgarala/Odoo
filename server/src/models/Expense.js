const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amountOriginal: Number,
  currencyOriginal: String,
  exchangedAmount: Number,
  exchangeRate: Number,
  category: String,
  description: String,
  date: Date,
  receipts: [{ url: String, storageId: String }],
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  approvalFlowId: { type: mongoose.Schema.Types.ObjectId, ref: "ApprovalFlow" },
  approvals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Approval" }],
  metadata: Object
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
