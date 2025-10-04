import React from "react";
import {
  FaUsers,
  FaRegChartBar,
  FaUserTie,
  FaMoneyBillWave,
  FaHistory,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const iconMap = {
  users: <FaUsers />,
  rules: <FaRegChartBar />,
  expenses: <FaMoneyBillWave />,
  approvals: <FaRegChartBar />,
  team: <FaUsers />,
  submit: <FaMoneyBillWave />,
  history: <FaHistory />,
};

const Sidebar = ({ menuItems, activeKey, onChange }) => (
  <aside className="pro-sidebar">
    <div className="pro-sidebar-logo">Expense Manager</div>
    <nav>
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`pro-sidebar-item${
            activeKey === item.key ? " active" : ""
          }`}
          onClick={() => onChange(item.key)}
        >
          {iconMap[item.key] && (
            <span className="pro-sidebar-icon">{iconMap[item.key]}</span>
          )}
          <span>{item.label}</span>
        </button>
      ))}
      <button className="pro-sidebar-logout" onClick={() => alert("Logout!")}>
        <FiLogOut />
        <span>Logout</span>
      </button>
    </nav>
  </aside>
);

export default Sidebar;
