import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { api } from "../api";
import SEO from "../components/SEO";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.submitContact(form);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#faf9f6] dark:bg-[#0f0f1a] flex items-center justify-center px-4">
        <SEO
          title="Contact HimQueenKing — Book Your Himachal Pradesh Tour Package"
          description="Contact HimQueenKing to book your Himachal Pradesh, Shimla Manali, Spiti Valley or Ladakh tour package. Call +91 9805556015 or WhatsApp us."
          keywords="contact travel agency himachal, book himachal tour, shimla manali tour booking, himachal travel agency contact"
          url="https://himqueenking.onrender.com/contact"
        />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-10 sm:p-14 text-center max-w-md w-full border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Request Received!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Thank you for reaching out, <strong>{form.name}</strong>! Our travel experts will get back to you within 24 hours.</p>
          <a href="/" className="inline-flex px-8 py-3 rounded-xl bg-[#b8860b] text-white font-semibold hover:bg-[#996f08] transition-all">
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6] dark:bg-[#0f0f1a]">
      <SEO
        title="Contact HimQueenKing — Book Your Himachal Pradesh Tour Package"
        description="Contact HimQueenKing to book your Himachal Pradesh, Shimla Manali, Spiti Valley or Ladakh tour package. Call +91 9805556015 or WhatsApp us."
        keywords="contact travel agency himachal, book himachal tour, shimla manali tour booking, himachal travel agency contact"
        url="https://himqueenking.onrender.com/contact"
      />
      {/* Hero */}
        <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Contact Us</h1>
          <p className="text-gray-300 max-w-lg">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-[#b8860b]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Send us a Message</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">We typically reply within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all text-sm" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your travel plans, questions, or requirements..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent transition-all text-sm resize-none" />
              </div>
              {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-lg">{error}</p>}
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#b8860b] text-white font-semibold hover:bg-[#996f08] transition-all disabled:opacity-60">
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-7 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 flex items-center justify-center shrink-0"><MapPin size={18} className="text-[#b8860b]" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Visit Us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mall Road, Manali, Himachal Pradesh, India 175131</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 flex items-center justify-center shrink-0"><Phone size={18} className="text-[#b8860b]" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Call Us</p>
                    <a href="tel:+919805556015" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#b8860b]">+91 98055 56015</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 flex items-center justify-center shrink-0"><Mail size={18} className="text-[#b8860b]" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Us</p>
                    <a href="mailto:hello@himqueenking.com" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#b8860b]">hello@himqueenking.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#b8860b] rounded-2xl p-7 text-white">
              <h3 className="font-bold mb-2">Office Hours</h3>
              <div className="space-y-1.5 text-sm text-white/80">
                <p>Monday – Friday: 9:00 AM – 7:00 PM</p>
                <p>Saturday: 9:00 AM – 5:00 PM</p>
                <p>Sunday: 10:00 AM – 2:00 PM</p>
              </div>
            </div>

            <a href="/dream-destination" className="block bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-7 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Not sure where to go?</p>
              <p className="font-bold text-gray-900 dark:text-gray-100">Tell us your dream destination →</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Our experts will plan the perfect trip for you</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
