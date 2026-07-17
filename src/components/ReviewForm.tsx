import { useState } from "react";
import { Star, Camera, X, Send, CheckCircle } from "lucide-react";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tour, setTour] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError("Photo must be under 2MB"); return; }
    setError("");
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) { setError("Name and review are required"); return; }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), location: location.trim(), tour: tour.trim(), rating, text: text.trim(), photo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone(true);
    } catch (err: any) { setError(err.message); }
    finally { setSending(false); }
  };

  if (done) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-green-200 text-center">
        <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-gray-900 text-lg mb-1">Thank You!</h3>
        <p className="text-sm text-gray-500 mb-4">Your review has been submitted and will appear after admin approval.</p>
        <button onClick={() => { setDone(false); setName(""); setLocation(""); setTour(""); setRating(5); setText(""); setPhoto(null); }}
          className="text-sm text-[#b8860b] font-semibold underline">Write another review</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-900 text-lg mb-1">Share Your Experience</h3>
      <p className="text-sm text-gray-500 mb-5">Your review helps other travelers choose their next adventure</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onMouseEnter={() => setHoveredStar(s)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setRating(s)}>
                <Star size={28} className={`transition-colors cursor-pointer ${(hoveredStar || rating) >= s ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
              </button>
            ))}
            <span className="text-sm text-gray-500 self-center ml-2">{rating}/5</span>
          </div>
        </div>

        {/* Name + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Mitchell" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. London, UK" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none" />
          </div>
        </div>

        {/* Tour */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Which tour did you take?</label>
          <input type="text" value={tour} onChange={(e) => setTour(e.target.value)}
            placeholder="e.g. Leh Ladakh Royal Ride" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none" />
        </div>

        {/* Review Text */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Your Review *</label>
          <textarea rows={4} required value={text} onChange={(e) => setText(e.target.value)} maxLength={1000}
            placeholder="Tell other travelers about your experience..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none resize-none" />
          <p className="text-xs text-gray-400 mt-1 text-right">{text.length}/1000</p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Add a Photo (optional)</label>
          {photo ? (
            <div className="relative inline-block">
              <img src={photo} alt="Review photo" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
              <button type="button" onClick={() => setPhoto(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#b8860b] transition text-gray-500 hover:text-[#b8860b]">
              <Camera size={20} />
              <span className="text-sm">Choose a photo (max 2MB)</span>
              <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </label>
          )}
        </div>

        {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

        <button type="submit" disabled={sending}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#b8860b] hover:bg-[#996f08] text-white font-semibold transition-all active:scale-[0.98] disabled:opacity-60">
          {sending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> Submit Review</>}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
