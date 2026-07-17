import { useState } from "react";
import { X } from "lucide-react";

interface BookingModalProps {
  item: { title: string; price: number; duration?: string; location?: string } | null;
  onClose: () => void;
}

export default function BookingModal({ item, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [message, setMessage] = useState("");

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Booking Request - HimQueenKing*\n\n` +
      `📦 *Item:* ${item.title}\n` +
      (item.duration ? `📅 *Duration:* ${item.duration}\n` : "") +
      (item.location ? `📍 *Location:* ${item.location}\n` : "") +
      `💰 *Price:* ₹${item.price.toLocaleString()}\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📅 *Preferred Date:* ${date || "Flexible"}\n` +
      `👥 *Travelers:* ${travelers}\n` +
      (message ? `📝 *Message:* ${message}` : "");

    window.open(`https://wa.me/919805556015?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Book Now</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 bg-gray-50 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">{item.title}</h3>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            {item.duration && <span>{item.duration}</span>}
            {item.location && <span>{item.location}</span>}
          </div>
          <p className="text-2xl font-black text-orange-600 mt-2">₹{item.price.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm" placeholder="Enter phone number" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
              <select value={travelers} onChange={(e) => setTravelers(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm">
                {[1,2,3,4,5,6,7,8,10,15,20].map(n => <option key={n} value={n}>{n} {n===1?"Person":"People"}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
            <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm resize-none" placeholder="Any special requests..." />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all active:scale-[0.98]">
            Send Booking via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
