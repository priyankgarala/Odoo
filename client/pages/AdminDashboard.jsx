import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserManagement from "../components/UserManagement";

const menuItems = [
  { key: "user-management", label: "User Management" },
  { key: "approval-rules", label: "Approval Rules" },
  { key: "all-expenses", label: "All Expenses" },
];

const roles = ["Employee", "Manager"];

const initialUsers = [
  { id: "u1", name: "Alex Johnson", role: "Manager", managerId: null },
  { id: "u2", name: "Jill Smith", role: "Employee", managerId: "u1" },
];

const approvalRules = [
  { id: "r1", description: "Manager must approve expenses under $500" },
  { id: "r2", description: "CFO approval required for expenses above $5000" },
];

const initialAllExpenses = [
  {
    id: "e1",
    employee: "John Doe",
    date: "2025-09-10",
    amount: 350,
    currency: "USD",
    category: "Travel",
    status: "Approved",
  },
  {
    id: "e2",
    employee: "Jane Roe",
    date: "2025-09-15",
    amount: 6750,
    currency: "USD",
    category: "Equipment",
    status: "Pending",
  },
  {
    id: "e3",
    employee: "Mark Twain",
    date: "2025-09-30",
    amount: 120,
    currency: "USD",
    category: "Meals",
    status: "Rejected",
  },
];

function filterExpenses(expenses, dateFilter, statusFilter) {
  const now = new Date();
  const [users, setUsers] = useState(initialUsers);

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    if (statusFilter !== "all" && expense.status !== statusFilter) return false;

    if (dateFilter === "daily") {
      return expenseDate.toDateString() === now.toDateString();
    }
    if (dateFilter === "weekly") {
      const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }
    if (dateFilter === "monthly") {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    }
    if (dateFilter === "yearly") {
      return expenseDate.getFullYear() === now.getFullYear();
    }
    return true;
  });
}

export default function AdminDashboard({ user = { name: "Admin Alice" } }) {
  const [activeMenu, setActiveMenu] = useState(menuItems[0].key);
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({
    name: "",
    role: "Employee",
    managerId: null,
  });
  const [allExpenses] = useState(initialAllExpenses);
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredExpenses = filterExpenses(
    allExpenses,
    dateFilter,
    statusFilter
  );

  const totalAccepted = filteredExpenses
    .filter((e) => e.status === "Approved")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalRejected = filteredExpenses
    .filter((e) => e.status === "Rejected")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalPending = filteredExpenses
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === "null" ? null : value,
    }));
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("User name is required.");
      return;
    }
    const newUser = {
      id: "u" + (users.length + 1),
      name: form.name.trim(),
      role: form.role,
      managerId: form.role === "Employee" ? form.managerId : null,
    };
    setUsers([...users, newUser]);
    setForm({ name: "", role: "Employee", managerId: null });
  };

  const updateUser = (id, field, value) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, [field]: value === "null" ? null : value } : u
      )
    );
  };

  const renderUserManagement = () => (
    <UserManagement users={users} setUsers={setUsers} />
  );

  const renderApprovalRules = () => (
    <div className="table-card" style={{ maxWidth: 600, margin: "auto" }}>
      <div className="table-card-header">Approval Rules</div>
      <ul style={{ paddingLeft: "1.5rem", fontSize: "1.1rem" }}>
        {approvalRules.map((r) => (
          <li key={r.id} style={{ padding: "0.4rem 0" }}>
            {r.description}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderAllExpenses = () => (
    <div className="table-card" style={{ maxWidth: 900, margin: "auto" }}>
      {/* Summary cards */}
      <div
        className="summary-cards"
        style={{ display: "flex", gap: 20, marginBottom: 20 }}
      >
        <div
          className="summary-card"
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#eff6ff",
            borderRadius: 10,
          }}
        >
          <div>
            <b>Total Accepted</b>
          </div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#22c55e" }}>
            ${totalAccepted.toFixed(2)}
          </div>
        </div>
        <div
          className="summary-card"
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#fde2e1",
            borderRadius: 10,
          }}
        >
          <div>
            <b>Total Rejected</b>
          </div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#ef4444" }}>
            ${totalRejected.toFixed(2)}
          </div>
        </div>
        <div
          className="summary-card"
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#fef3c7",
            borderRadius: 10,
          }}
        >
          <div>
            <b>Total Pending</b>
          </div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#ca8a04" }}>
            ${totalPending.toFixed(2)}
          </div>
        </div>
      </div>

      <div
        className="table-card-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>All Expenses</span>
        <div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ marginRight: 10, padding: "6px 10px" }}
          >
            <option value="all">All Time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "6px 10px" }}
          >
            <option value="all">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 && (
            <tr>
              <td colSpan={6}>No expenses found.</td>
            </tr>
          )}
          {filteredExpenses.map(
            ({ id, employee, date, amount, currency, category, status }) => (
              <tr key={id}>
                <td>{employee}</td>
                <td>{date}</td>
                <td>{amount}</td>
                <td>{currency}</td>
                <td>{category}</td>
                <td>{status}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    if (activeMenu === "user-management") return renderUserManagement();
    if (activeMenu === "approval-rules") return renderApprovalRules();
    if (activeMenu === "all-expenses") return renderAllExpenses();
    return null;
  };

  return (
    <DashboardLayout
      user={user}
      menuItems={menuItems}
      activeMenu={activeMenu}
      onMenuClick={setActiveMenu}
    >
      <div style={{ maxWidth: 960, margin: "auto" }}>
        <h2>Welcome back, {user.name}</h2>

        {renderContent()}
      </div>
    </DashboardLayout>
  );
}
