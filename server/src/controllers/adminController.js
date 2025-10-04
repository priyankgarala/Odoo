const User = require("../models/User");
const Company = require("../models/Company");
const ApprovalFlow = require("../models/ApprovalFlow");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, managerId } = req.body;
    const companyId = req.user.companyId;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const passwordHash = await bcrypt.hash(password || "Password@123", 10);
    const user = await User.create({ name, email, passwordHash, role, managerId, companyId });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const users = await User.find({ companyId }).select("-passwordHash");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to list users" });
  }
};

exports.createApprovalFlow = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { name, steps, rule } = req.body;
    // steps -> [{ stepNumber, approverIds: [...] , parallel }]
    const flow = await ApprovalFlow.create({ companyId, name, steps, rule, createdBy: req.user._id });
    res.status(201).json(flow);
  } catch (err) {
    console.error("createApprovalFlow err:", err);
    res.status(500).json({ message: "Failed to create approval flow", error: err.message });
  }
};

exports.listApprovalFlows = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const flows = await ApprovalFlow.find({ companyId }).populate('rule.specificApproverId', 'name email');
    res.json(flows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch flows" });
  }
};
