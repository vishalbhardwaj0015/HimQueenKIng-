import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div className="bg-[#1a1a2e] rounded-3xl p-10 sm:p-14 text-center"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-14 h-14 bg-[#b8860b] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={26} className="text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Get Exclusive <span className="text-[#f0c75e]">Travel Deals</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Subscribe for curated itineraries, early-bird discounts, and secret Himalayan destinations.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/10">
                <Mail size={16} className="text-white/40 shrink-0" />
                <input type="email" placeholder="Enter your email" value={email}
                  onChange={e => setEmail(e.target.value)} required
                  className="bg-transparent text-white text-sm outline-none placeholder:text-white/30 w-full" />
              </div>
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="bg-[#b8860b] hover:bg-[#996f08] text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-60">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (<><span>Subscribe</span><Send size={15}</>)}
              </motion.button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-3">
              <CheckCircle size={48} className="text-green-400" />
              <p className="text-white font-bold text-xl">You're in!</p>
              <p className="text-gray-400 text-sm">Check your inbox for exclusive deals.</p>
            </motion.div>
          )}

          <p className="text-white/20 text-xs mt-6">No spam. Unsubscribe anytime. 12,000+ subscribers.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
