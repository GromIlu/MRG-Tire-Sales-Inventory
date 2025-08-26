import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-64 h-full bg-gray-900 text-white shadow-xl">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Sidebar - desktop */}
      <div className="hidden lg:block w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main content */}
<div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
  <Navbar onMenuClick={() => setSidebarOpen(true)} user={user} />
  <main className="flex-1 overflow-auto p-6 text-gray-900 dark:text-gray-100">
    {children}
  </main>
</div>
    </div>
  );
}
