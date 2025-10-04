import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const menuItems = [
  { label: "Approval Queue", key: "approvals" },
  { label: "Team Expenses", key: "team" },
];

const ManagerDashboard = ({ user }) => {
  const [approvalRequests, setApprovalRequests] = useState([
    {
      id: "a1",
      employee: "John Doe",
      amount: 125,
      currency: "USD",
      category: "Travel",
      description: "Flight ticket",
      date: "2025-09-25",
    },
  ]);

  const [teamExpenses, setTeamExpenses] = useState([
    {
      id: "t1",
      employee: "Sarah Smith",
      amount: 45,
      currency: "USD",
      category: "Food",
      description: "Client lunch",
      date: "2025-09-20",
      status: "Approved",
    },
  ]);

  const handleApprove = (id) => {
    alert(`Approved expense ID: ${id}`);
    setApprovalRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    alert(`Rejected expense ID: ${id}`);
    setApprovalRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const renderContent = (activeKey) => {
    switch (activeKey) {
      case "approvals":
        if (approvalRequests.length === 0)
          return <p>No expenses pending your approval.</p>;
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
                  Description
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {approvalRequests.map(
                ({
                  id,
                  employee,
                  date,
                  amount,
                  currency,
                  category,
                  description,
                }) => (
                  <tr key={id} style={{ borderBottom: "1px solid #e1e6f4" }}>
                    <td style={{ padding: "12px 18px" }}>{employee}</td>
                    <td style={{ padding: "12px 18px" }}>{date}</td>
                    <td style={{ padding: "12px 18px" }}>
                      {amount} {currency}
                    </td>
                    <td style={{ padding: "12px 18px" }}>{category}</td>
                    <td style={{ padding: "12px 18px" }}>{description}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <button
                        onClick={() => handleApprove(id)}
                        style={{
                          backgroundColor: "#3dba36",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(id)}
                        style={{
                          backgroundColor: "#d54444",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        );
      case "team":
        if (teamExpenses.length === 0)
          return <p>No expenses from your team.</p>;
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
                  Description
                </th>
                <th style={{ padding: "12px 18px", textAlign: "left" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {teamExpenses.map(
                ({
                  id,
                  employee,
                  date,
                  amount,
                  currency,
                  category,
                  description,
                  status,
                }) => (
                  <tr key={id} style={{ borderBottom: "1px solid #e1e6f4" }}>
                    <td style={{ padding: "12px 18px" }}>{employee}</td>
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

export default ManagerDashboard;
