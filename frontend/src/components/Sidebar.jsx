import { NavLink } from "react-router-dom";
import { Home, Package, ShoppingCart, BarChart, MessageCircle, User, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <Home size={20} /> },
  { name: "Products", path: "/products", icon: <Package size={20} /> },
  { name: "Sales", path: "/sales", icon: <ShoppingCart size={20} /> },
  { name: "Reports", path: "/reports", icon: <BarChart size={20} /> },
  { name: "Messages", path: "/messages", icon: <MessageCircle size={20} /> },
  { name: "Profile", path: "/profile", icon: <User size={20} /> },
];

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="p-6 border-b border-slate-700/30 bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      {/* Logo + Title */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">MRG Tire Center</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Management Portal</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 mt-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition text-gray-800 dark:text-gray-200 ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

    </div>
  );
}
