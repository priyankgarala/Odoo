const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  country: String,
  currency: { code: String, symbol: String },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("Company", CompanySchema);
