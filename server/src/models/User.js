const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  name: String,
  email: { type: String, unique: true },
  password: String,   // instead of passwordHash
  role: { type: String, enum: ["Admin", "Manager", "Employee"], default: "Employee" },
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);
