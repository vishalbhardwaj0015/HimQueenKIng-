import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-pink-900/30" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div className="glass rounded-3xl p-10 text-center"
          initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={30} className="text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Get Exclusive <span className="gradient-text">Travel Deals</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Subscribe and be the first to receive curated itineraries, early-bird discounts, and secret destinations.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 flex items-center gap-3 glass rounded-xl px-4 py-3">
                <Mail size={16} className="text-white/40 shrink-0" />
                <input type="email" placeholder="Enter your email" value={email}
                  onChange={e => setEmail(e.target.value)} required
                  className="bg-transparent text-white text-sm outline-none placeholder:text-white/30 w-full" />
              </div>
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (<><span>Subscribe</span><Send size={15} /></>)}
              </motion.button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-3">
              <CheckCircle size={48} className="text-emerald-400" />
              <p className="text-white font-bold text-xl">You're in! 🎉</p>
              <p className="text-white/60 text-sm">Check your inbox for exclusive deals.</p>
            </motion.div>
          )}

          <p className="text-white/30 text-xs mt-6">✨ No spam. Unsubscribe anytime. 50,000+ subscribers.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
