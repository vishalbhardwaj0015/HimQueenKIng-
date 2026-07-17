import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = msg || "Hi! I'm interested in your Himalayan tours.";
    window.open(`https://wa.me/919805556015?text=${encodeURIComponent(text)}`, "_blank");
    setMsg("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-[#25D366] p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Chat with us!</p>
                  <p className="text-xs text-white/80">HimQueenKing Travel Experts</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>
            <form onSubmit={send} className="p-4 space-y-3">
              <p className="text-sm text-gray-600">Send us a quick message on WhatsApp:</p>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Hi! I'm interested in..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#25D366] resize-none"
              />
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-2.5 rounded-lg transition text-sm">
                <Send size={14} /> Send on WhatsApp
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#20BD5A] transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
