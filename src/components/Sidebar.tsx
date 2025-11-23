import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  Store,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/inventory", label: "Inventario", icon: Package },
    { path: "/sales", label: "Ventas", icon: ShoppingCart },
    { path: "/reports", label: "Reportes", icon: FileText },
    { path: "/settings", label: "Ajustes", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2E86C1] rounded-lg flex items-center justify-center">
          <Store className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-gray-900">Mi Autoservicio</h1>
          <p className="text-xs text-gray-500">Gestión integral</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#2E86C1] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
