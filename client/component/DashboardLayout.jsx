import React, { useState } from "react";

const DashboardLayout = ({ user, menuItems, children }) => {
  const [activeKey, setActiveKey] = useState(menuItems[0].key);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      <aside className="sidebar">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <h2 className="sidebar-logo">Expense Manager</h2>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeKey === item.key ? "active" : ""}`}
              onClick={() => setActiveKey(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>{menuItems.find((i) => i.key === activeKey)?.label}</h1>
          <div className="user-info">
            <span>Hi, {user.name}</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>
        <section className="content-area">{children(activeKey)}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;
