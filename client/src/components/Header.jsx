import React from "react";

const Header = ({ title, user }) => (
  <header className="topnav-header">
    <h1>{title}</h1>
    <div className="topnav-header-user">
      <img
        src="https://i.pravatar.cc/40"
        alt="User"
        className="topnav-avatar"
      />
      <span className="topnav-header-username">{user?.name || "User"}</span>
      <span className="topnav-header-role">{user?.role}</span>
    </div>
  </header>
);

export default Header;
