const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  approverIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // can be one or many
  parallel: { type: Boolean, default: true } // if true, approvals in step can be parallel
}, { _id: false });

const RuleSchema = new mongoose.Schema({
  type: { type: String, enum: ['none','percentage','specific','hybrid'], default: 'none' },
  percentageThreshold: Number,            // e.g., 60 for 60%
  specificApproverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // e.g. CFO
}, { _id: false });

const ApprovalFlowSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  name: { type: String, required: true },
  steps: [ StepSchema ],
  rule: RuleSchema,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("ApprovalFlow", ApprovalFlowSchema);
