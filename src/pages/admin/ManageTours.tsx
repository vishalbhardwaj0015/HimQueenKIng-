import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useAuth } from "../../store/authStore";

interface Tour {
  id: number;
  title: string;
  destination: string;
  description: string;
  price: number;
  original_price: number;
  image: string;
  duration: string;
  group_size: string;
  difficulty: string;
  includes: string[];
  highlights: string[];
  badge: string;
  is_active: boolean;
}

const emptyTour = {
  title: "",
  destination: "",
  description: "",
  price: 0,
  original_price: 0,
  image: "",
  duration: "",
  group_size: "",
  difficulty: "Easy",
  includes: "",
  highlights: "",
  badge: "",
  is_active: true,
};

const ManageTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyTour });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const { user, load } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!user) navigate("/admin/login"); }, [user, navigate]);

  const fetchTours = () => {
    api.getToursAll()
      .then((data) => setTours((data.tours || data) as Tour[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) fetchTours(); }, [user]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyTour });
    setShowModal(true);
  };

  const openEdit = (tour: Tour) => {
    setEditingId(tour.id);
    setForm({
      title: tour.title,
      destination: tour.destination,
      description: tour.description,
      price: tour.price,
      original_price: tour.original_price,
      image: tour.image,
      duration: tour.duration,
      group_size: tour.group_size,
      difficulty: tour.difficulty,
      includes: Array.isArray(tour.includes) ? tour.includes.join(", ") : tour.includes,
      highlights: Array.isArray(tour.highlights) ? tour.highlights.join(", ") : tour.highlights,
      badge: tour.badge,
      is_active: tour.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        includes: form.includes.split(",").map((s) => s.trim()).filter(Boolean),
        highlights: form.highlights.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (editingId) {
        await api.updateTour(editingId, payload);
      } else {
        await api.createTour(payload);
      }
      setShowModal(false);
      fetchTours();
    } catch (err) {
      alert("Failed to save tour");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteTour(deleteId);
      setDeleteId(null);
      fetchTours();
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 text-lg">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Tours</h1>
          <p className="text-gray-500 text-sm mt-1">{tours.length} total tours</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          + Add Tour
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Destination</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Price</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Duration</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Difficulty</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Badge</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Active</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">{tour.title}</td>
                  <td className="px-6 py-4 text-gray-600">{tour.destination}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">₹{tour.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{tour.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      tour.difficulty === "Hard" ? "bg-red-100 text-red-700" :
                      tour.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {tour.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tour.badge || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`w-2 h-2 inline-block rounded-full ${tour.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(tour)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                      Edit
                    </button>
                    <button onClick={() => setDeleteId(tour.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {tours.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">No tours found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Tour" : "Create Tour"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                  <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                  <input value={form.group_size} onChange={(e) => setForm({ ...form, group_size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
                  <select value={form.is_active ? "true" : "false"} onChange={(e) => setForm({ ...form, is_active: e.target.value === "true" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Includes (comma-separated)</label>
                  <input value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma-separated)</label>
                  <input value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Tour</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this tour? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="px-5 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTours;
