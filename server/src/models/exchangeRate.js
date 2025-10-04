const mongoose = require("mongoose");
const ExchangeRateSchema = new mongoose.Schema({
  base: { type: String, required: true, unique: true },
  rates: { type: mongoose.Schema.Types.Mixed },
  fetchedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("ExchangeRate", ExchangeRateSchema);
