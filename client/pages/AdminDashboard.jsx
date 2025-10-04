import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "../src/styles/Dashboard.css";
const menuItems = [
  { key: "user-management", label: "User Management" },
  { key: "approval-rules", label: "Approval Rules" },
  { key: "all-expenses", label: "All Expenses" },
];

const users = [
  { id: "u1", name: "Alex Johnson", role: "Manager" },
  { id: "u2", name: "Jill Smith", role: "Employee" },
];

const approvalRules = [
  { id: "r1", description: "Manager must approve expenses < $500" },
  { id: "r2", description: "CFO approval required for > $5000" },
];

const allExpenses = [
  {
    id: "e1",
    employee: "John Doe",
    date: "Sep 10",
    amount: 350,
    currency: "USD",
    category: "Travel",
    status: "Approved",
  },
  {
    id: "e2",
    employee: "Jane Roe",
    date: "Sep 15",
    amount: 6750,
    currency: "USD",
    category: "Equipment",
    status: "Pending",
  },
];

export default function AdminDashboard({ user = { name: "Jordan" } }) {
  const [activeTab, setActiveTab] = useState(menuItems[0].key);

  const renderContent = () => {
    if (activeTab === "user-management") {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, role }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === "approval-rules") {
      return (
        <ul>
          {approvalRules.map(({ id, description }) => (
            <li key={id}>{description}</li>
          ))}
        </ul>
      );
    } else if (activeTab === "all-expenses") {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.map(
              ({ id, employee, date, amount, currency, category, status }) => (
                <tr key={id}>
                  <td>{employee}</td>
                  <td>{date}</td>
                  <td>
                    {amount} {currency}
                  </td>
                  <td>{category}</td>
                  <td>{status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <DashboardLayout user={user} menuItems={menuItems}>
      <div>
        <h2>Welcome back, {user.name}</h2>
        <div className="admin-tabs">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={activeTab === item.key ? "tab-active" : ""}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}
