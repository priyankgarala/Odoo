import React from "react";
import "../styles/Dashboard.css";

const DashboardLayout = ({
  user,
  menuItems,
  activeMenu,
  onMenuClick,
  children,
}) => (
  <div className="layout-root">
    <aside className="layout-sidebar">
      <div className="sidebar-logo">Expense Manager</div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar-nav-item${
              activeMenu === item.key ? " active" : ""
            }`}
            onClick={() => onMenuClick(item.key)}
          >
            {item.label}
          </button>
        ))}
        <button className="sidebar-nav-logout">Logout</button>
      </nav>
    </aside>
    <main className="layout-content">
      <header className="layout-header">
        <h1>
          {activeMenu && menuItems.find((m) => m.key === activeMenu)?.label}
        </h1>
        <div className="user-info">
          <span>{user.name}</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <section className="layout-main">{children}</section>
    </main>
  </div>
);

export default DashboardLayout;
