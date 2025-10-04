import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import "../css/Dashboard.css";
const menu = [
  { label: "User Management", key: "users" },
  { label: "Approval Rules", key: "rules" },
  { label: "All Expenses", key: "expenses" },
];

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [approvalRules, setApprovalRules] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  useEffect(() => {
    // TODO replace with API calls
    setUsers([
      { id: "u1", name: "Alex Johnson", role: "Manager" },
      { id: "u2", name: "Jill Smith", role: "Employee" },
    ]);

    setApprovalRules([
      { id: "r1", description: "Manager must approve expenses < $500" },
      { id: "r2", description: "CFO approval required for > $5000" },
    ]);

    setAllExpenses([
      {
        id: "e1",
        employee: "John Doe",
        amount: 350,
        currency: "USD",
        category: "Travel",
        status: "Approved",
        date: "2025-09-10",
      },
      {
        id: "e2",
        employee: "Jane Roe",
        amount: 6750,
        currency: "USD",
        category: "Equipment",
        status: "Pending",
        date: "2025-09-15",
      },
    ]);
  }, []);

  const renderContent = (key) => {
    switch (key) {
      case "users":
        return users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="user-table">
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

      case "rules":
        return approvalRules.length === 0 ? (
          <p>No approval rules defined.</p>
        ) : (
          <ul className="rules-list">
            {approvalRules.map(({ id, description }) => (
              <li key={id}>{description}</li>
            ))}
          </ul>
        );

      case "expenses":
        return allExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <table className="expense-table">
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
                ({
                  id,
                  employee,
                  date,
                  amount,
                  currency,
                  category,
                  status,
                }) => (
                  <tr key={id}>
                    <td>{employee}</td>
                    <td>{date}</td>
                    <td>
                      {amount} {currency}
                    </td>
                    <td>{category}</td>
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

  return (
    <DashboardLayout user={user} menuItems={menu}>
      {renderContent}
    </DashboardLayout>
  );
};

export default AdminDashboard;
