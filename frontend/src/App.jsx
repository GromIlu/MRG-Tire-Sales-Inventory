import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import MainPage from "./pages/MainPage";   // 👈 import MainPage
import AdminLogin from "./admin/login/AdminLogin"; // 👈 optional if you separate
import UserLogin from "./pages/Login";   // 👈 optional if you separate

export default function App() {
  const currentUser = {
    name: "Gerome Ilustre",
    role: "Admin",
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<MainPage />} />

        {/* Login Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<UserLogin />} />

        {/* Dashboard Pages (moved under /dashboard) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/products"
          element={
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          }
        />
        <Route
          path="/sales"
          element={
            <DashboardLayout>
              <Sales />
            </DashboardLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <DashboardLayout>
              <Messages />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
