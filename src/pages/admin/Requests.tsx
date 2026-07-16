import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useAuth } from "../../store/authStore";

interface Request {
  id: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  type: string;
  status: string;
  created_at: string;
  destination?: string;
  travel_date?: string;
  group_size?: string;
}

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { user, load } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!user) navigate("/admin/login"); }, [user, navigate]);

  const fetchRequests = () => {
    api.getRequests()
      .then((data) => setRequests((data.requests || data) as Request[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) fetchRequests(); }, [user]);

  const handleStatusChange = async (req: Request, newStatus: string) => {
    try {
      await api.updateStatus(req.type, req.id, newStatus);
      setRequests((prev) =>
        prev.map((r) =>
          r.id === req.id && r.type === req.type ? { ...r, status: newStatus } : r
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const filtered = requests.filter((r) => {
    if (filterType !== "all" && r.type !== filterType) return false;
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 text-lg">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Manage contact and dream destination requests</p>
      </div>

      <div className="flex gap-3 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
        >
          <option value="all">All Types</option>
          <option value="contact">Contact</option>
          <option value="dream">Dream</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="completed">Completed</option>
        </select>
        <span className="self-center text-sm text-gray-500">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Message</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((req) => (
                <tr key={`${req.type}-${req.id}`} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[160px] truncate">{req.name}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate">{req.email}</td>
                  <td className="px-6 py-4 text-gray-600">{req.phone || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      req.type === "dream" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {req.type === "dream" ? "Dream" : "Contact"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate">
                    {req.message || req.destination || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                    {req.created_at ? new Date(req.created_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      req.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : req.status === "contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">No requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requests;
