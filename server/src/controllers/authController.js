const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Company = require("../models/Company");
const { generateToken } = require("../config/jwt");
const fetch = require("node-fetch");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, companyName, country } = req.body;

    // fetch currency from restcountries
    const countryData = await fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,currencies`).then(r=>r.json());
    const currencyCode = Object.keys(countryData[0].currencies)[0];
    const currencySymbol = countryData[0].currencies[currencyCode].symbol;

    const company = await Company.create({
      name: companyName,
      country,
      currency: { code: currencyCode, symbol: currencySymbol }
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await User.create({
      companyId: company._id,
      name,
      email,
      passwordHash,
      role: "admin"
    });

    company.admins.push(admin._id);
    await company.save();

    const token = generateToken({ userId: admin._id, companyId: company._id, role: "admin" });

    res.status(201).json({ token, company, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};
