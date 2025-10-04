import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Header from "../components/Header";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto p-6">
          <Routes>
            {/* Auth (public) routes */}
            <Route path="/login/*" element={<AuthRoutes />} />
            <Route path="/signup/*" element={<AuthRoutes />} />

            {/* Protected routes */}
            <Route path="/*" element={<ProtectedRoutes />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
