import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Compass } from "lucide-react";
import { api } from "../api";

const DreamDestination = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dreamDestination: "", travelDates: "", budget: "", travelers: "2", specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.submitDream(form);
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
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-10 sm:p-14 text-center max-w-lg w-full border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#b8860b]/10 flex items-center justify-center">
            <Sparkles size={36} className="text-[#b8860b]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Dream Received!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Thank you, <strong>{form.name}</strong>! Our travel experts are already working on your dream trip to <strong>{form.dreamDestination}</strong>.</p>
          <div className="bg-[#b8860b]/5 rounded-xl p-4 mb-6">
            <p className="text-sm text-[#b8860b] font-semibold">What happens next?</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 text-left">
              <li>✓ Our team will review your dream destination</li>
              <li>✓ We'll design a custom itinerary within 24 hours</li>
              <li>✓ You'll receive a detailed plan at <strong>{form.email}</strong></li>
              <li>✓ We'll call you at <strong>{form.phone}</strong> to discuss</li>
            </ul>
          </div>
          <a href="/" className="inline-flex px-8 py-3 rounded-xl bg-[#b8860b] text-white font-semibold hover:bg-[#996f08] transition-all">
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6] dark:bg-[#0f0f1a]">
      <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1a1a2e]/10 backdrop-blur-sm text-white text-xs font-medium mb-4">
            <Compass size={14} /> Our team plans your perfect trip
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Plan Your Dream Trip</h1>
          <p className="text-gray-300 max-w-lg">Tell us your dream destination and our travel experts will design the perfect itinerary</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#b8860b] flex items-center justify-center text-white shadow-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tell Us Your Dream</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details and we'll handle the rest</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Trip Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dream Destination *</label>
                  <input type="text" name="dreamDestination" value={form.dreamDestination} onChange={handleChange} required placeholder="Where do you dream of going? (e.g., Ladakh, Bali, Switzerland)" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Preferred Travel Dates</label>
                    <input type="text" name="travelDates" value={form.travelDates} onChange={handleChange} placeholder="e.g., 15th - 22nd August 2026" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Number of Travelers *</label>
                    <select name="travelers" value={form.travelers} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm bg-white dark:bg-[#1a1a2e]">
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3-5">3–5 People</option>
                      <option value="6-10">6–10 People</option>
                      <option value="10+">10+ People (Group)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget Range (per person)</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm bg-white dark:bg-[#1a1a2e]">
                    <option value="">Select budget range</option>
                    <option value="under-5000">Under ₹5,000</option>
                    <option value="5000-10000">₹5,000 – ₹10,000</option>
                    <option value="10000-25000">₹10,000 – ₹25,000</option>
                    <option value="25000-50000">₹25,000 – ₹50,000</option>
                    <option value="50000+">₹50,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Special Requests or Preferences</label>
                  <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4} placeholder="Tell us about any special requirements — adventure activities, dietary needs, wheelchair access, honeymoon setup, etc." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b8860b] focus:border-transparent text-sm resize-none" />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-lg">{error}</p>}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#b8860b] text-white font-bold text-lg hover:bg-[#996f08] transition-all disabled:opacity-60">
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Submit My Dream <Send size={18} /></>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DreamDestination;
