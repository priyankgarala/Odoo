import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard(){
  return (
    <div>
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/submit" className="p-4 bg-white rounded shadow">Submit Expense</Link>
        <Link to="/approvals" className="p-4 bg-white rounded shadow">Approvals</Link>
        <div className="p-4 bg-white rounded shadow">Reports (soon)</div>
      </div>
    </div>
  );
}
