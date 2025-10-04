import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const menuItems = [
  { key: "approval-queue", label: "Approval Queue" },
  { key: "team-expenses", label: "Team Expenses" },
  { key: "history", label: "Approval History" },
];

const initialApprovalQueue = [
  {
    id: "a1",
    employee: "John Doe",
    date: "2025-09-25",
    amount: 125,
    currency: "USD",
    category: "Travel",
    description: "Flight ticket",
    status: "Pending",
    comments: [],
  },
];

const initialTeamExpenses = [
  {
    id: "t1",
    employee: "Sarah Smith",
    date: "2025-09-20",
    amount: 45,
    currency: "USD",
    category: "Food",
    description: "Client lunch",
    status: "Approved",
  },
];

export default function ManagerDashboard({ user = { name: "Manager Mike" } }) {
  const [activeMenu, setActiveMenu] = useState(menuItems[0].key);
  const [approvalQueue, setApprovalQueue] = useState(initialApprovalQueue);
  const [teamExpenses] = useState(initialTeamExpenses);
  const [history, setHistory] = useState([]);
  const [comments, setComments] = useState({});

  // Update comment for a specific expense
  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const handleApproveReject = (id, isApproved) => {
    const comment = comments[id] || "";

    const updatedExpense = approvalQueue.find((exp) => exp.id === id);
    if (!updatedExpense) return;

    const expenseWithUpdate = {
      ...updatedExpense,
      status: isApproved ? "Approved" : "Rejected",
      comments: [
        ...updatedExpense.comments,
        {
          by: user.name,
          comment,
          date: new Date().toISOString(),
          approved: isApproved,
        },
      ],
    };

    // Remove from approval queue & add to history
    setApprovalQueue((prev) => prev.filter((exp) => exp.id !== id));
    setHistory((prev) => [expenseWithUpdate, ...prev]);
    setComments((prev) => {
      const newComments = { ...prev };
      delete newComments[id];
      return newComments;
    });
  };

  const renderApprovalQueue = () => {
    if (approvalQueue.length === 0)
      return <p>No expenses awaiting your approval.</p>;

    return approvalQueue.map((expense) => (
      <div
        key={expense.id}
        className="table-card"
        style={{
          marginBottom: 30,
          padding: 25,
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3>
          Approval Request from {expense.employee} - {expense.amount}{" "}
          {expense.currency}
        </h3>
        <p>
          Date: {expense.date} | Category: {expense.category}
        </p>
        <p>Description: {expense.description}</p>
        <textarea
          placeholder="Add your comment (optional)"
          style={{
            width: "100%",
            minHeight: "70px",
            marginBottom: 20,
            padding: 12,
            borderRadius: 8,
          }}
          value={comments[expense.id] || ""}
          onChange={(e) => handleCommentChange(expense.id, e.target.value)}
        />
        <button
          onClick={() => handleApproveReject(expense.id, true)}
          style={{ marginRight: 12, padding: "10px 24px", cursor: "pointer" }}
        >
          Approve
        </button>
        <button
          onClick={() => handleApproveReject(expense.id, false)}
          style={{
            padding: "10px 24px",
            backgroundColor: "#e01b24",
            color: "white",
            cursor: "pointer",
          }}
        >
          Reject
        </button>
        <div style={{ marginTop: 18 }}>
          <strong>Comments:</strong>
          {expense.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            expense.comments.map((c, i) => (
              <p key={i}>
                <b>{c.by}</b> ({new Date(c.date).toLocaleString()}):{" "}
                {c.approved ? "Approved" : "Rejected"} - {c.comment}
              </p>
            ))
          )}
        </div>
      </div>
    ));
  };

  const renderTeamExpenses = () => (
    <div className="table-card" style={{ maxWidth: "900px", margin: "auto" }}>
      <div className="table-card-header">Team Expenses</div>
      <table className="table">
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
            ({ id, employee, date, amount, category, description, status }) => (
              <tr key={id}>
                <td>{employee}</td>
                <td>{date}</td>
                <td>${amount}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{status}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );

  const renderHistory = () => {
    if (history.length === 0)
      return <p>No approved or rejected expenses yet.</p>;

    return (
      <div className="table-card" style={{ maxWidth: "900px", margin: "auto" }}>
        <div className="table-card-header">Approval History</div>
        <table className="table">
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
            {history.map(
              ({
                id,
                employee,
                date,
                amount,
                category,
                description,
                status,
              }) => (
                <tr key={id}>
                  <td>{employee}</td>
                  <td>{date}</td>
                  <td>${amount}</td>
                  <td>{category}</td>
                  <td>{description}</td>
                  <td>{status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (activeMenu === "approval-queue") return renderApprovalQueue();
    if (activeMenu === "team-expenses") return renderTeamExpenses();
    if (activeMenu === "history") return renderHistory();
    return null;
  };

  return (
    <DashboardLayout user={user} menuItems={menuItems}>
      <div style={{ maxWidth: "960px", margin: "auto" }}>
        <h2>Welcome back, {user.name}</h2>
        <div style={{ marginBottom: 20 }}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={activeMenu === item.key ? "tab-active" : ""}
              onClick={() => setActiveMenu(item.key)}
              style={{
                marginRight: 12,
                padding: "8px 20px",
                fontWeight: "600",
                cursor: "pointer",
                borderRadius: 6,
              }}
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
