import React, { useState } from "react";

const menuItems = {
  Admin: [
    { label: "User Management", key: "users" },
    { label: "Approval Rules", key: "rules" },
    { label: "All Expenses", key: "expenses" },
  ],
  Manager: [
    { label: "Approval Queue", key: "approvals" },
    { label: "Team Expenses", key: "team" },
  ],
  Employee: [
    { label: "Submit Expense", key: "submit" },
    { label: "My Expenses", key: "history" },
  ],
};

const Dashboard = ({ user }) => {
  const [activeMenu, setActiveMenu] = useState(
    menuItems[user.role] ? menuItems[user.role][0].key : ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeMenu) {
      case "users":
        return <div>User Management Page Content</div>;
      case "rules":
        return <div>Approval Rules Page Content</div>;
      case "expenses":
        return <div>All Expenses Page Content</div>;
      case "approvals":
        return <div>Approval Queue Content</div>;
      case "team":
        return <div>Team Expenses Content</div>;
      case "submit":
        return <div>Submit Expense Form</div>;
      case "history":
        return <div>My Expense History</div>;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <aside className="sidebar">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <h2 className="sidebar-title">Expense Manager</h2>
        <nav className="sidebar-nav">
          {menuItems[user.role].map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeMenu === item.key ? "active" : ""}`}
              onClick={() => setActiveMenu(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>
            {menuItems[user.role].find((i) => i.key === activeMenu)?.label}
          </h1>
          <div className="user-info">
            <span>Hi, {user.name}</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>
        <section className="content-area">{renderContent()}</section>
      </main>
    </div>
  );
};

export default Dashboard;
