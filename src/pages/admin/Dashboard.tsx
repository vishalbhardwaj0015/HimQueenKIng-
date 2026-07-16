import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useAuth } from "../../store/authStore";

interface Stats {
  totalTours: number;
  totalTreks: number;
  totalHotels: number;
  totalPackages: number;
  pendingContacts: number;
  pendingDreams: number;
  recentRequests: any[];
}

const statCards = [
  { key: "totalTours", label: "Total Tours", color: "bg-blue-500", icon: "🗺️" },
  { key: "totalTreks", label: "Total Treks", color: "bg-purple-500", icon: "⛰️" },
  { key: "totalHotels", label: "Total Hotels", color: "bg-amber-500", icon: "🏨" },
  { key: "totalPackages", label: "Total Packages", color: "bg-emerald-500", icon: "📦" },
  { key: "pendingContacts", label: "Pending Contacts", color: "bg-rose-500", icon: "📩" },
  { key: "pendingDreams", label: "Pending Dreams", color: "bg-cyan-500", icon: "✨" },
];

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, load } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!user) navigate("/admin/login"); }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    api.getStats()
      .then((data) => setStats(data as unknown as Stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(stats as any)?.[card.key] ?? 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {stats?.recentRequests?.length ? (
            stats.recentRequests.map((req: any) => (
              <div key={`${req.type}-${req.id}`} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{req.name || req.email}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{req.email} &middot; {req.phone || "N/A"}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    req.type === "dream" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {req.type === "dream" ? "Dream" : "Contact"}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    req.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : req.status === "contacted"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-400 text-sm">No recent requests</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
