import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useAuth } from "../../store/authStore";

interface Trek {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  difficulty: string;
  duration: string;
  altitude: string;
  best_time: string;
  region: string;
  is_active: boolean;
}

const emptyTrek = {
  title: "",
  description: "",
  price: 0,
  image: "",
  difficulty: "Easy",
  duration: "",
  altitude: "",
  best_time: "",
  region: "",
  is_active: true,
};

const ManageTreks = () => {
  const [treks, setTreks] = useState<Trek[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyTrek });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const { user, load } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!user) navigate("/admin/login"); }, [user, navigate]);

  const fetchTreks = () => {
    api.getTreksAll()
      .then((data) => setTreks((data.treks || data) as Trek[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) fetchTreks(); }, [user]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyTrek });
    setShowModal(true);
  };

  const openEdit = (trek: Trek) => {
    setEditingId(trek.id);
    setForm({
      title: trek.title,
      description: trek.description,
      price: trek.price,
      image: trek.image,
      difficulty: trek.difficulty,
      duration: trek.duration,
      altitude: trek.altitude,
      best_time: trek.best_time,
      region: trek.region,
      is_active: trek.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        await api.updateTrek(editingId, form);
      } else {
        await api.createTrek(form);
      }
      setShowModal(false);
      fetchTreks();
    } catch {
      alert("Failed to save trek");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteTrek(deleteId);
      setDeleteId(null);
      fetchTreks();
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 text-lg">Loading treks...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Treks</h1>
          <p className="text-gray-500 text-sm mt-1">{treks.length} total treks</p>
        </div>
        <button onClick={openCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
          + Add Trek
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Region</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Price</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Duration</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Altitude</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Difficulty</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Active</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {treks.map((trek) => (
                <tr key={trek.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">{trek.title}</td>
                  <td className="px-6 py-4 text-gray-600">{trek.region}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">₹{trek.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{trek.duration}</td>
                  <td className="px-6 py-4 text-gray-600">{trek.altitude}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      trek.difficulty === "Hard" ? "bg-red-100 text-red-700" :
                      trek.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {trek.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`w-2 h-2 inline-block rounded-full ${trek.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(trek)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                      Edit
                    </button>
                    <button onClick={() => setDeleteId(trek.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {treks.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">No treks found</td>
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
                {editingId ? "Edit Trek" : "Create Trek"}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altitude</label>
                  <input value={form.altitude} onChange={(e) => setForm({ ...form, altitude: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Best Time</label>
                  <input value={form.best_time} onChange={(e) => setForm({ ...form, best_time: e.target.value })}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Trek</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this trek? This action cannot be undone.</p>
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

export default ManageTreks;
