import React, { useState } from "react";
import api, { setAuthToken } from "../api/api"; // axios instance
import useAuth from "../hooks/useAuth"; // your custom auth hook
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // 🔹 Signup API
        await api.post("/auth/signup", form);
        alert("Signup successful! Please log in.");
        setIsSignup(false);
      } else {
        // 🔹 Login API (include role)
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
          role: form.role,
        });

        const { token, user } = res.data;
        setAuthToken(token);
        login(token, user);
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center min-h-screen bg-gray-100">
      <div className="auth-card bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                className="auth-input w-full border p-2 rounded"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company ID"
                required
              />
              <input
                className="auth-input w-full border p-2 rounded"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </>
          )}
          <input
            className="auth-input w-full border p-2 rounded"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="auth-input w-full border p-2 rounded"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
          />
          {/* 🔹 Role field (always visible, after password) */}
          <select
            className="auth-input w-full border p-2 rounded"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            className="auth-btn w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="auth-switch text-center mt-4">
          {isSignup ? "Already registered?" : "New here?"}{" "}
          <button
            type="button"
            className="auth-link text-blue-600 underline"
            onClick={() => setIsSignup((s) => !s)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
