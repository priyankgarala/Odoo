import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../component/AuthPage";
import EmployeeDashboard from "../component/EmployeeDashboard";
import Dashboard from "../component/Dashboard";
import DashboardLayout from "../component/DashboardLayout";
import AdminDashboard from "../component/AdminDashboard";
import ManagerDashboard from "../component/ManagerDashboard";

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
            <Route path="/Dashboard" element={<Dashboard />}></Route>
            <Route
              path="/dashboardlayout"
              element={<DashboardLayout />}
            ></Route>
            {/* <Route path="/contact" element={<Contact />}></Route> */}
            {/* <Route path="/service" element={<Service />}></Route> */}
            {/* <Route path="/login" element={<Login />}></Route> */}
            <Route path="/" element={<AuthPage />}></Route>
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
