import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import "../css/Dashboard.css";
const menu = [
  { label: "Approval Queue", key: "approvals" },
  { label: "Team Expenses", key: "team" },
];

const ManagerDashboard = ({ user }) => {
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [teamExpenses, setTeamExpenses] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API calls
    setApprovalRequests([
      {
        id: "a1",
        employee: "John Doe",
        amount: 125,
        currency: "USD",
        category: "Travel",
        description: "Flight ticket",
        date: "2025-09-25",
        status: "Pending",
      },
    ]);

    setTeamExpenses([
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
  }, []);

  const handleApproval = (id, approve) => {
    alert(`Expense ID ${id} ${approve ? "approved" : "rejected"} (mock)`);
    setApprovalRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const renderContent = (key) => {
    switch (key) {
      case "approvals":
        return approvalRequests.length === 0 ? (
          <p>No expenses pending your approval.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
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
                  <tr key={id}>
                    <td>{employee}</td>
                    <td>{date}</td>
                    <td>
                      {amount} {currency}
                    </td>
                    <td>{category}</td>
                    <td>{description}</td>
                    <td>
                      <button
                        className="approve-btn"
                        onClick={() => handleApproval(id, true)}
                      >
                        Approve
                      </button>{" "}
                      <button
                        className="reject-btn"
                        onClick={() => handleApproval(id, false)}
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
        return teamExpenses.length === 0 ? (
          <p>No expenses from your team.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
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
                  <tr key={id}>
                    <td>{employee}</td>
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

  return (
    <DashboardLayout user={user} menuItems={menu}>
      {renderContent}
    </DashboardLayout>
  );
};

export default ManagerDashboard;
