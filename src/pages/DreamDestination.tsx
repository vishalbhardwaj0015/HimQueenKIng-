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
      <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 sm:p-14 text-center max-w-lg w-full">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Sparkles size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Dream Received!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Thank you, <strong>{form.name}</strong>! Our travel experts are already working on your dream trip to <strong>{form.dreamDestination}</strong>.</p>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-orange-700 font-medium">What happens next?</p>
            <ul className="text-sm text-orange-600 mt-2 space-y-1 text-left">
              <li>✓ Our team will review your dream destination</li>
              <li>✓ We'll design a custom itinerary within 24 hours</li>
              <li>✓ You'll receive a detailed plan at <strong>{form.email}</strong></li>
              <li>✓ We'll call you at <strong>{form.phone}</strong> to discuss</li>
            </ul>
          </div>
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
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-4">
            <Compass size={14} /> Our team plans your perfect trip
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Plan Your Dream Trip</h1>
          <p className="text-white/80 max-w-lg">Tell us your dream destination and our travel experts will design the perfect itinerary for you</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tell Us Your Dream</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details and we'll handle the rest</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Trip Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Dream Destination *</label>
                  <input type="text" name="dreamDestination" value={form.dreamDestination} onChange={handleChange} required placeholder="Where do you dream of going? (e.g., Ladakh, Bali, Switzerland)" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Preferred Travel Dates</label>
                    <input type="text" name="travelDates" value={form.travelDates} onChange={handleChange} placeholder="e.g., 15th - 22nd August 2026" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Number of Travelers *</label>
                    <select name="travelers" value={form.travelers} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white dark:bg-gray-800">
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3-5">3–5 People</option>
                      <option value="6-10">6–10 People</option>
                      <option value="10+">10+ People (Group)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Budget Range (per person)</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white dark:bg-gray-800">
                    <option value="">Select budget range</option>
                    <option value="under-5000">Under ₹5,000</option>
                    <option value="5000-10000">₹5,000 – ₹10,000</option>
                    <option value="10000-25000">₹10,000 – ₹25,000</option>
                    <option value="25000-50000">₹25,000 – ₹50,000</option>
                    <option value="50000+">₹50,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Special Requests or Preferences</label>
                  <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4} placeholder="Tell us about any special requirements — adventure activities, dietary needs, wheelchair access, honeymoon setup, etc." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none" />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">{error}</p>}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all disabled:opacity-60">
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
