import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const categories = ["Travel", "Meals", "Office"];
const currencies = [
  { value: "USD", label: "USD – US Dollar" },
  { value: "INR", label: "INR – Indian Rupee" },
  { value: "EUR", label: "EUR – Euro" },
];

const menu = [
  { key: "overview", label: "Overview" },
  { key: "add-expense", label: "Add Expense" },
  { key: "view-expenses", label: "View Expenses" },
];

const initialExpenses = [
  {
    id: 1,
    date: "2025-09-12",
    category: "Travel",
    currency: "USD",
    amount: 420,
    description: "NYC client visit",
    status: "Approved",
  },
  {
    id: 2,
    date: "2025-09-28",
    category: "Meals",
    currency: "USD",
    amount: 62.5,
    description: "Team lunch",
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-09-06",
    category: "Office",
    currency: "USD",
    amount: 38.4,
    description: "Cables & adapters",
    status: "Rejected",
  },
  {
    id: 4,
    date: "2025-09-15",
    category: "Travel",
    currency: "USD",
    amount: 80,
    description: "Taxi fare",
    status: "Pending",
  },
  {
    id: 5,
    date: "2025-08-13",
    category: "Meals",
    currency: "USD",
    amount: 45,
    description: "Client lunch",
    status: "Approved",
  },
];

function filterExpenses(expenses, type) {
  // Date arithmetic for filters
  const now = new Date();
  return expenses.filter((e) => {
    const d = new Date(e.date);
    if (type === "monthly") {
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    } else if (type === "yearly") {
      return d.getFullYear() === now.getFullYear();
    } else if (type === "weekly") {
      const diff = (now - d) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }
    return true;
  });
}

export default function EmployeeDashboard() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [activeMenu, setActiveMenu] = useState("overview");
  const [overviewFilter, setOverviewFilter] = useState("monthly");
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    currency: currencies[0].value,
    category: categories[0],
    amount: "",
    description: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const user = { name: "Jordan" };
  const submitForm = (e) => {
    e.preventDefault();

    setExpenses([
      {
        id: expenses.length + 1,
        ...form,
        amount: parseFloat(form.amount).toFixed(2),
        status: "Pending",
      },
      ...expenses,
    ]);

    // Reset form
    setForm({
      date: new Date().toISOString().slice(0, 10),
      currency: currencies[0].value,
      category: categories[0],
      amount: "",
      description: "",
    });

    setActiveMenu("view-expenses"); // optionally switch view back to expenses
  };

  // For overview cards: filter expenses and calculate totals
  const filteredExpenses = filterExpenses(expenses, overviewFilter);
  const totalAmount = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
  const totalPendingAmount = filteredExpenses
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  let mainContent;
  if (activeMenu === "overview") {
    mainContent = (
      <div>
        <h2>Welcome back, {user.name}</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <div>
              <b>
                Total{" "}
                {overviewFilter[0].toUpperCase() + overviewFilter.slice(1)}{" "}
                Expenses
              </b>
            </div>
            <div className="summary-main">${totalAmount.toFixed(2)}</div>
            <div>
              <select
                style={{
                  padding: "7px 12px",
                  marginTop: "11px",
                  fontWeight: "600",
                  borderRadius: "5px",
                  border: "1px solid #dfdff6",
                }}
                value={overviewFilter}
                onChange={(e) => setOverviewFilter(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
          <div className="summary-card">
            <div>
              <b>Total Pending Amount</b>
            </div>
            <div className="summary-main" style={{ color: "#eab308" }}>
              ${totalPendingAmount.toFixed(2)}
            </div>
            <div>Expenses awaiting approval</div>
          </div>
          <div className="summary-card">
            <div>
              <b>Categories</b>
            </div>
            <div className="summary-main">{categories.join(", ")}</div>
            <div>Spending split</div>
          </div>
        </div>
        <div className="table-card" style={{ marginTop: "2rem" }}>
          <div className="table-card-header">
            <span>Recent Expenses</span>
            <div>
              <span style={{ marginRight: "1rem", fontWeight: 600 }}>
                Filter:{" "}
              </span>
              <select
                style={{
                  padding: "6px 10px",
                  fontWeight: 600,
                  borderRadius: 5,
                  border: "1px solid #dfdff6",
                }}
                value={overviewFilter}
                onChange={(e) => setOverviewFilter(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(
                ({
                  id,
                  date,
                  category,
                  currency,
                  amount,
                  description,
                  status,
                }) => (
                  <tr key={id}>
                    <td>{date}</td>
                    <td>{category}</td>
                    <td>{currency}</td>
                    <td>${amount}</td>
                    <td>{description}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: 80,
                          padding: "5px 13px",
                          borderRadius: 16,
                          color: "white",
                          fontWeight: 600,
                          background:
                            status === "Approved"
                              ? "#2fc14d"
                              : status === "Pending"
                              ? "#eab308"
                              : "#ed4956",
                        }}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                )
              )}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={6}>No expenses found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  // ...Keep existing Add Expense and View Expense code for other tabs!
  else if (activeMenu === "add-expense") {
    mainContent = (
      <div className="table-card" style={{ marginBottom: 32 }}>
        <div className="table-card-header">Add Expense</div>
        <form className="quickadd-form" onSubmit={submitForm}>
          <div className="quickadd-row">
            <div>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleFormChange}
                required
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Currency</label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleFormChange}
                required
              >
                {currencies.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div style={{ marginTop: "13px" }}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              required
            />
          </div>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
            }}
          >
            <button
              type="button"
              className="table-topbtn"
              onClick={() => setActiveMenu("overview")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="card-btn"
              style={{ minWidth: 110 }}
            >
              Submit Expense
            </button>
          </div>
        </form>
      </div>
    );
  } else if (activeMenu === "view-expenses") {
    mainContent = (
      <div className="table-card">
        <div className="table-card-header">Expense History</div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              ({
                id,
                date,
                category,
                currency,
                amount,
                description,
                status,
              }) => (
                <tr key={id}>
                  <td>{date}</td>
                  <td>{category}</td>
                  <td>{currency}</td>
                  <td>{amount}</td>
                  <td>{description}</td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        minWidth: 80,
                        padding: "5px 13px",
                        borderRadius: 16,
                        color: "white",
                        fontWeight: 600,
                        background:
                          status === "Approved"
                            ? "#2fc14d"
                            : status === "Pending"
                            ? "#eab308"
                            : "#ed4956",
                      }}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    mainContent = (
      <div>
        <h2>Welcome back, {user.name}</h2>
        {/* You can add summary cards here or keep this section light */}
      </div>
    );
  }
  // Sidebar
  const sidebar = (
    <aside className="layout-sidebar">
      <div className="sidebar-logo">Expense Manager</div>
      <nav>
        {menu.map((item) => (
          <button
            key={item.key}
            className={`sidebar-nav-item${
              activeMenu === item.key ? " active" : ""
            }`}
            onClick={() => setActiveMenu(item.key)}
          >
            {item.label}
          </button>
        ))}
        <button className="sidebar-nav-logout">Logout</button>
      </nav>
    </aside>
  );

  return (
    <div className="layout-root">
      {sidebar}
      <main className="layout-content">
        <header className="layout-header">
          <h1>{menu.find((m) => m.key === activeMenu)?.label}</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="User avatar"
              className="user-avatar"
            />
          </div>
        </header>
        <section className="layout-main">{mainContent}</section>
      </main>
    </div>
  );
}
