const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["admin", "manager", "employee"], default: "employee" },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isManagerApprover: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
