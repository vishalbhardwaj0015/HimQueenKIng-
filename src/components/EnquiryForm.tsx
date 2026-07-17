import { useState } from "react";
import { Send } from "lucide-react";

interface EnquiryFormProps {
  itemName: string;
  itemType: string;
}

export default function EnquiryForm({ itemName, itemType }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Enquiry - HimQueenKing*\n\n` +
      `📦 *${itemType}:* ${itemName}\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `📍 *Traveling From:* ${place}\n` +
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
      <h3 className="text-lg font-bold text-gray-900 mb-1">Get More Details</h3>
      <p className="text-sm text-gray-500 mb-4">Fill the form and we'll contact you on WhatsApp</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" required placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
        <input type="tel" required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
        <input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
        <input type="text" required placeholder="Traveling From (e.g. Delhi)" value={place} onChange={(e) => setPlace(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
        <textarea rows={3} placeholder="Any special requirements..." value={desc} onChange={(e) => setDesc(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none" />
        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all active:scale-[0.98]">
          <Send size={16} /> Send Enquiry via WhatsApp
        </button>
      </form>
    </div>
  );
}
