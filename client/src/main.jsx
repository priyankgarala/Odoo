// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import  {AuthProvider}  from "./contexts/AuthContext"; // ✅ make sure this matches your export

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>   {/* ✅ Wrap App here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
