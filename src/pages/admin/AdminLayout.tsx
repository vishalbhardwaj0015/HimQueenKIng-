import { useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/authStore";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { label: "Tours", path: "/admin/tours", icon: "🗺️" },
  { label: "Treks", path: "/admin/treks", icon: "⛰️" },
  { label: "Hotels", path: "/admin/hotels", icon: "🏨" },
  { label: "Packages", path: "/admin/packages", icon: "📦" },
  { label: "Requests", path: "/admin/requests", icon: "📋" },
];

const AdminLayout = () => {
  const { user, logout, load } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!user) navigate("/admin/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold tracking-wide">HimQueenKing</h2>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="text-sm font-medium text-gray-300 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => { logout(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
