import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

interface EnquiryFormProps {
  itemName: string;
  itemType: string;
}

export default function EnquiryForm({ itemName, itemType }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("");
  const [desc, setDesc] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Enquiry - HimQueenKing*\n\n` +
      `📦 *${itemType}:* ${itemName}\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `💰 *Budget:* ${budget || "Not specified"}\n` +
      `👥 *Travelers:* ${travelers || "Not specified"}\n` +
      (desc ? `📝 *Details:* ${desc}` : "");

    window.open(`https://wa.me/919805556015?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-bold text-green-800 mb-1">Enquiry Sent!</h3>
        <p className="text-sm text-green-600">We'll get back to you on WhatsApp shortly.</p>
        <button onClick={() => setSent(false)} className="mt-3 text-sm text-green-700 underline font-medium">Send another enquiry</button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <MessageCircle size={18} className="text-[#25D366]" />
        <h3 className="text-lg font-bold text-gray-900">Get a Custom Quote</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">Tell us your budget and we'll design the perfect trip for you</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" required placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none" />
        <input type="tel" required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none" />
        <input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none" />
        <select value={budget} onChange={(e) => setBudget(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none bg-white text-gray-900">
          <option value="">Your Budget (per person)</option>
          <option value="Under ₹10,000">Under ₹10,000</option>
          <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
          <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
          <option value="₹50,000+">₹50,000+</option>
        </select>
        <select value={travelers} onChange={(e) => setTravelers(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none bg-white text-gray-900">
          <option value="">Number of Travelers</option>
          <option value="1 Person">1 Person</option>
          <option value="2 People">2 People</option>
          <option value="3-5 People">3–5 People</option>
          <option value="6-10 People">6–10 People</option>
          <option value="10+ People">10+ (Group)</option>
        </select>
        <textarea rows={3} placeholder="Tell us about your travel dates or any special requirements..." value={desc} onChange={(e) => setDesc(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#b8860b] focus:border-[#b8860b] outline-none resize-none" />
        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-all active:scale-[0.98]">
          <Send size={16} /> Get Quote on WhatsApp
        </button>
      </form>
    </div>
  );
}
