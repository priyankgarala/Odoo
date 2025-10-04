import React, { useState } from "react";

const DashboardLayout = ({ user, menuItems, children }) => {
  const [activeKey, setActiveKey] = useState(menuItems[0]?.key);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2d3a67",
        transition: "0.3s ease all",
      }}
    >
      <aside
        className="sidebar"
        style={{
          background: "#4c5de8",
          color: "white",
          width: sidebarOpen ? 220 : 60,
          display: "flex",
          flexDirection: "column",
          padding: "1.8rem 1rem",
          boxShadow: "4px 0 20px rgb(0 0 0 / 0.1)",
          transition: "width 0.3s ease",
        }}
      >
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Toggle Sidebar"
          style={{
            background: "transparent",
            border: "none",
            fontSize: "1.7rem",
            color: "white",
            cursor: "pointer",
            marginBottom: "1rem",
            alignSelf: "flex-start",
          }}
        >
          ☰
        </button>
        {sidebarOpen && (
          <>
            <h2
              style={{
                fontWeight: "700",
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                userSelect: "none",
                cursor: "default",
              }}
            >
              Expense Manager
            </h2>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
                overflowY: "auto",
              }}
            >
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveKey(item.key)}
                  style={{
                    background:
                      activeKey === item.key ? "#3a48c0" : "transparent",
                    color: "white",
                    border: "none",
                    padding: "0.85rem 1.2rem",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    fontWeight: "600",
                    textAlign: "left",
                    boxShadow:
                      activeKey === item.key
                        ? "0 0 10px rgb(53 70 167 / 0.75)"
                        : "none",
                    transition: "background 0.25s ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </>
        )}
      </aside>
      <main
        className="main-content"
        style={{
          flex: 1,
          background: "#f9faff",
          padding: "1.75rem 2rem",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <header
          className="main-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #d7daf7",
            paddingBottom: "0.8rem",
          }}
        >
          <h1
            style={{
              fontWeight: "700",
              fontSize: "1.5rem",
              color: "#3b4578",
            }}
          >
            {menuItems.find((i) => i.key === activeKey)?.label || ""}
          </h1>
          <div
            style={{
              fontWeight: "600",
              fontSize: "0.95rem",
              color: "#57648b",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <span>Hi, {user?.name || "User"}</span>
            <button
              style={{
                background: "#d44a48",
                border: "none",
                color: "white",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.88rem",
                transition: "background 0.2s ease",
              }}
              onClick={() => alert("Logout clicked")}
            >
              Logout
            </button>
          </div>
        </header>
        <section
          style={{
            flex: 1,
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem 2rem",
            boxShadow: "0 6px 18px rgb(50 63 90 / 0.08)",
            overflowY: "auto",
            minHeight: 400,
          }}
        >
          {children(activeKey)}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
