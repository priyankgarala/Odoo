import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthPage from "../pages/AuthPage";
import UserManagement from "../components/UserManagement";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/employeedashboard"
              element={<EmployeeDashboard />}
            ></Route>
            <Route
              path="/managerdashboard"
              element={<ManagerDashboard />}
            ></Route>
            <Route path="/admindashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/dashboardlayout"
              element={<DashboardLayout />}
            ></Route>
            <Route path="/" element={<AuthPage />}></Route>
            <Route path="usermanagement" element={<UserManagement />}></Route>
            {/* admin 
            <Route path="/admin" element={<Adminlayout />}></Route>
            <Route path="/Admin" element={<Adminlayout />}>
              {/* // we not need to write "/users beacuse nested Route is automaticaly consider like " Admin/users" */}
            {/* <Route path="users" element={<Adminusers />} />
              <Route path="contacts" element={<Admincontacts />} />
              <Route path="campaigns" element={<Admincampaigns />} /> */}{" "}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
