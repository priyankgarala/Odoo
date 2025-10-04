import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const menuItems = [
  { label: "User Management", key: "users" },
  { label: "Approval Rules", key: "rules" },
  { label: "All Expenses", key: "expenses" },
];

const AdminDashboard = ({ user }) => {
  const [users] = useState([
    { id: "u1", name: "Alex Johnson", role: "Manager" },
    { id: "u2", name: "Jill Smith", role: "Employee" },
  ]);

  const [approvalRules] = useState([
    { id: "r1", description: "Manager must approve expenses < $500" },
    { id: "r2", description: "CFO approval required for > $5000" },
  ]);

  const [allExpenses] = useState([
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

  const renderContent = (activeKey) => {
    switch (activeKey) {
      case "users":
        if (users.length === 0) return <p>No users found.</p>;
        return (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#4c5de8", color: "white" }}>
              <tr>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Name
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, role }) => (
                <tr key={id} style={{ borderBottom: "1px solid #e1e6f4" }}>
                  <td style={{ padding: "12px 18px" }}>{name}</td>
                  <td style={{ padding: "12px 18px" }}>{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "rules":
        if (approvalRules.length === 0)
          return <p>No approval rules defined.</p>;
        return (
          <ul>
            {approvalRules.map(({ id, description }) => (
              <li key={id}>{description}</li>
            ))}
          </ul>
        );
      case "expenses":
        if (allExpenses.length === 0) return <p>No expenses found.</p>;
        return (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#4c5de8", color: "white" }}>
              <tr>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Employee
                </th>
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
                  Status
                </th>
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
                  <tr key={id} style={{ borderBottom: "1px solid #e1e6f4" }}>
                    <td style={{ padding: "12px 18px" }}>{employee}</td>
                    <td style={{ padding: "12px 18px" }}>{date}</td>
                    <td style={{ padding: "12px 18px" }}>
                      {amount} {currency}
                    </td>
                    <td style={{ padding: "12px 18px" }}>{category}</td>
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

export default AdminDashboard;
