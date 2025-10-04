const fetch = require("node-fetch");
const ExchangeRate = require("../models/ExchangeRate");
const Company = require("../models/Company");

exports.getExchangeRate = async (from, companyId) => {
  const company = await Company.findById(companyId);
  const to = company.currency.code;

  if (from === to) return 1;

  let latest = await ExchangeRate.findOne({ base: from });
  if (!latest || (Date.now() - latest.fetchedAt.getTime()) > 12*60*60*1000) {
    const data = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`).then(r=>r.json());
    latest = await ExchangeRate.findOneAndUpdate(
      { base: from },
      { base: from, rates: data.rates, fetchedAt: new Date() },
      { upsert: true, new: true }
    );
  }
  return latest.rates[to];
};
