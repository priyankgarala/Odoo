import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import "../css/Dashboard.css";
const menu = [
  { label: "Submit Expense", key: "submit" },
  { label: "My Expenses", key: "history" },
];

const categories = [
  "Travel",
  "Food",
  "Accommodation",
  "Office Supplies",
  "Miscellaneous",
];

const EmployeeDashboard = ({ user }) => {
  const [form, setForm] = useState({
    amount: "",
    currency: "USD",
    category: "",
    description: "",
    date: "",
    receipt: null,
  });

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // TODO: Replace with real fetch API call
    setExpenses([
      {
        id: "1",
        date: "2025-09-28",
        amount: 45,
        currency: "USD",
        category: "Food",
        description: "Lunch with client",
        status: "Approved",
      },
      {
        id: "2",
        date: "2025-09-26",
        amount: 120,
        currency: "USD",
        category: "Travel",
        description: "Taxi fare",
        status: "Pending",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "receipt") {
      setForm((prev) => ({ ...prev, receipt: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Expense submitted (mock)!");
    setForm({
      amount: "",
      currency: "USD",
      category: "",
      description: "",
      date: "",
      receipt: null,
    });
  };

  const renderContent = (key) => {
    switch (key) {
      case "submit":
        return (
          <form className="expense-form" onSubmit={handleSubmit}>
            <label>
              Amount
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </label>
            <label>
              Currency
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </label>
            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Description
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description"
              />
            </label>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Upload Receipt
              <input
                type="file"
                name="receipt"
                accept="image/*,application/pdf"
                onChange={handleChange}
              />
            </label>
            <button className="submit-btn" type="submit">
              Submit Expense
            </button>
          </form>
        );
      case "history":
        return expenses.length === 0 ? (
          <p>You have not submitted any expenses.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(
                ({
                  id,
                  date,
                  amount,
                  currency,
                  category,
                  description,
                  status,
                }) => (
                  <tr key={id}>
                    <td>{date}</td>
                    <td>
                      {amount} {currency}
                    </td>
                    <td>{category}</td>
                    <td>{description}</td>
                    <td className={`status ${status.toLowerCase()}`}>
                      {status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  //   return (
  //     <DashboardLayout user={user} menuItems={menu}>
  //       {renderContent}
  //     </DashboardLayout>
  //   );
};

export default EmployeeDashboard;
