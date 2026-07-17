import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import { api } from "../../api";
import { useAuth } from "../../store/authStore";

interface Review {
  id: number;
  name: string;
  location?: string;
  tour?: string;
  rating: number;
  text: string;
  photo?: string;
  status: string;
  created_at: string;
}

const ManageReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!user) navigate("/admin/login"); }, [user, navigate]);

  const fetchReviews = () => {
    api.getAllReviews()
      .then((data: any) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) fetchReviews(); }, [user]);

  const handleStatus = async (id: number, status: string) => {
    try {
      await api.updateReviewStatus(id, status);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch { alert("Failed"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    try {
      await api.deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch { alert("Failed"); }
  };

  const filtered = reviews.filter(r => filter === "all" || r.status === filter);
  const counts = { all: reviews.length, pending: reviews.filter(r => r.status === "pending").length, approved: reviews.filter(r => r.status === "approved").length, rejected: reviews.filter(r => r.status === "rejected").length };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  if (loading) return <div className="flex items-center justify-center h-full"><div className="text-gray-500 text-lg">Loading reviews...</div></div>;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">Manage traveler reviews and photos</p>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === f ? "bg-emerald-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400"
          }`}>
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              {review.photo ? (
                <img src={review.photo} alt="Review" className="w-16 h-16 rounded-xl object-cover border border-gray-200 cursor-pointer hover:scale-105 transition"
                  onClick={() => setPreview(review.photo!)} />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-[#b8860b] text-white flex items-center justify-center text-lg font-bold shrink-0">
                  {getInitials(review.name)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  {review.location && <span className="text-sm text-gray-400">from {review.location}</span>}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    review.status === "approved" ? "bg-green-100 text-green-700" :
                    review.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}>{review.status}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < review.rating ? "#f59e0b" : "transparent"} color={i < review.rating ? "#f59e0b" : "#e5e7eb"} />
                  ))}
                  {review.tour && <span className="text-xs text-[#b8860b] font-medium ml-2">{review.tour}</span>}
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.text}</p>
                <p className="text-xs text-gray-400">{review.created_at ? new Date(review.created_at).toLocaleDateString() : ""}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                {review.status !== "approved" && (
                  <button onClick={() => handleStatus(review.id, "approved")} className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition">
                    <CheckCircle size={13} /> Approve
                  </button>
                )}
                {review.status !== "rejected" && (
                  <button onClick={() => handleStatus(review.id, "rejected")} className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-100 transition">
                    <XCircle size={13} /> Reject
                  </button>
                )}
                {review.status !== "pending" && (
                  <button onClick={() => handleStatus(review.id, "pending")} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100 transition">
                    <Eye size={13} /> Pending
                  </button>
                )}
                <button onClick={() => handleDelete(review.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No reviews found</div>}
      </div>

      {/* Photo Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <img src={preview} alt="Preview" className="max-w-full max-h-[80vh] rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
