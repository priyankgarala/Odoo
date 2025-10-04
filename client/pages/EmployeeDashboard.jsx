import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const menuItems = [
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
  });

  const [expenses, setExpenses] = useState([
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Expense submitted: ${form.amount} ${form.currency}, category: ${form.category}`
    );
    setForm({
      amount: "",
      currency: "USD",
      category: "",
      description: "",
      date: "",
    });
    // For now, no real submission or API call
  };

  const renderContent = (activeKey) => {
    switch (activeKey) {
      case "submit":
        return (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
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
                <option>USD</option>
                <option>EUR</option>
                <option>INR</option>
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
            <button
              type="submit"
              style={{
                background: "linear-gradient(90deg, #4c5de8 15%, #798bff 85%)",
                border: "none",
                color: "white",
                padding: "12px 0",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Submit Expense
            </button>
          </form>
        );
      case "history":
        if (expenses.length === 0) return <p>No expenses submitted yet.</p>;
        return (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#4c5de8", color: "white" }}>
              <tr>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Date
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Amount
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Category
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Description
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Status
                </th>
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
                  <tr key={id} style={{ borderBottom: "1px solid #e1e6f4" }}>
                    <td style={{ padding: "12px 18px" }}>{date}</td>
                    <td style={{ padding: "12px 18px" }}>
                      {amount} {currency}
                    </td>
                    <td style={{ padding: "12px 18px" }}>{category}</td>
                    <td style={{ padding: "12px 18px" }}>{description}</td>
                    <td
                      style={{
                        padding: "12px 18px",
                        color: "white",
                        fontWeight: "600",
                        borderRadius: "16px",
                        backgroundColor:
                          status === "Approved"
                            ? "#2fc14d"
                            : status === "Pending"
                            ? "#eab308"
                            : "#ed4956",
                        display: "inline-block",
                        minWidth: "80px",
                        textAlign: "center",
                      }}
                    >
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

  return (
    <DashboardLayout user={user} menuItems={menuItems}>
      {renderContent}
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
