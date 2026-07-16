import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { api } from "../api";

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
      <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 sm:p-14 text-center max-w-md w-full">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Request Accepted!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Thank you for reaching out, <strong>{form.name}</strong>! Our travel experts will review your message and get back to you within 24 hours.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">A confirmation email has been sent to <strong>{form.email}</strong></p>
          <a href="/" className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all">
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Contact Us</h1>
          <p className="text-white/80 max-w-lg">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
                <MessageSquare size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">We typically reply within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Your Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your travel plans, questions, or requirements..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm resize-none" />
              </div>
              {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">{error}</p>}
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-60">
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-7">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0"><MapPin size={18} className="text-orange-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Visit Us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mall Road, Manali, Himachal Pradesh, India 175131</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0"><Phone size={18} className="text-blue-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Call Us</p>
                    <a href="tel:+911800123456" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500">+91 1800-123-456</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0"><Mail size={18} className="text-emerald-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email Us</p>
                    <a href="mailto:hello@himqueenking.com" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500">hello@himqueenking.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-7 text-white">
              <h3 className="font-bold mb-2">Office Hours</h3>
              <div className="space-y-1.5 text-sm text-white/80">
                <p>Monday – Friday: 9:00 AM – 7:00 PM</p>
                <p>Saturday: 9:00 AM – 5:00 PM</p>
                <p>Sunday: 10:00 AM – 2:00 PM</p>
              </div>
            </div>

            <a href="/dream-destination" className="block bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-7 hover:shadow-xl transition-all">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Not sure where to go?</p>
              <p className="font-bold text-gray-900 dark:text-white">Tell us your dream destination →</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Our experts will plan the perfect trip for you</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
