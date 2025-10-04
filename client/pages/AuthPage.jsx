import React, { useState } from "react";

const AuthPage = ({ onLogin, onSignup }) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <form className="auth-form">
          {isSignup && (
            <>
              <input className="auth-input" placeholder="Company Name" required />
              <select className="auth-input" required>
                <option value="">Select Country</option>
                <option>India</option>
                <option>United States</option>
                <option>Germany</option>
                <option>Japan</option>
                {/* Add more dynamically */}
              </select>
            </>
          )}
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            required
          />
          {isSignup && (
            <input className="auth-input" placeholder="Full Name" required />
          )}
          <button className="auth-btn" type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="auth-switch">
          {isSignup ? "Already registered?" : "New here?"}
          <button
            className="auth-link"
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
