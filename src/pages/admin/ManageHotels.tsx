import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useAuth } from "../../store/authStore";

interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  badge: string;
  is_active: boolean;
}

const emptyHotel = {
  name: "",
  location: "",
  description: "",
  price: 0,
  image: "",
  amenities: "",
  badge: "",
  is_active: true,
};

const ManageHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyHotel });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const { user, load } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!user) navigate("/admin/login"); }, [user, navigate]);

  const fetchHotels = () => {
    api.getHotelsAll()
      .then((data) => setHotels((data.hotels || data) as Hotel[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) fetchHotels(); }, [user]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyHotel });
    setShowModal(true);
  };

  const openEdit = (hotel: Hotel) => {
    setEditingId(hotel.id);
    setForm({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      price: hotel.price,
      image: hotel.image,
      amenities: Array.isArray(hotel.amenities) ? hotel.amenities.join(", ") : hotel.amenities,
      badge: hotel.badge,
      is_active: hotel.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        amenities: form.amenities.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (editingId) {
        await api.updateHotel(editingId, payload);
      } else {
        await api.createHotel(payload);
      }
      setShowModal(false);
      fetchHotels();
    } catch {
      alert("Failed to save hotel");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteHotel(deleteId);
      setDeleteId(null);
      fetchHotels();
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 text-lg">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Hotels</h1>
          <p className="text-gray-500 text-sm mt-1">{hotels.length} total hotels</p>
        </div>
        <button onClick={openCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
          + Add Hotel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Location</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Price</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Badge</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Active</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">{hotel.name}</td>
                  <td className="px-6 py-4 text-gray-600">{hotel.location}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">₹{hotel.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{hotel.badge || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`w-2 h-2 inline-block rounded-full ${hotel.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(hotel)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                      Edit
                    </button>
                    <button onClick={() => setDeleteId(hotel.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {hotels.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No hotels found</td>
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
                {editingId ? "Edit Hotel" : "Create Hotel"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                  <input value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Hotel</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this hotel? This action cannot be undone.</p>
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

export default ManageHotels;
