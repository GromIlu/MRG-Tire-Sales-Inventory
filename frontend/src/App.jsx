import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";


export default function App() {
    const currentUser = {
    name: "Gerome Ilustre",  // <- registered user’s name
    role: "Admin",
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Pages */}
        <Route
          path="/"
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
