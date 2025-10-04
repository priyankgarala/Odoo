import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/dashboard" className="font-bold text-xl">ExpenseApp</Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/submit" className="text-blue-600">Submit</Link>
              <Link to="/approvals" className="text-blue-600">Approvals</Link>
              <button
                onClick={() => { logout(); nav("/login"); }}
                className="px-3 py-1 border rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600">Login</Link>
              <Link to="/signup" className="text-blue-600">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
