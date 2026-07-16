import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { id: 1, name: "Priya Mehta", location: "Mumbai", avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5, tour: "Manali Snow Adventure",
    text: "Absolutely breathtaking! The team made every moment magical. From snow-capped Rohtang to cozy Old Manali — this trip changed my perspective on travel forever." },
  { id: 2, name: "Arjun Thakur", location: "Delhi", avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5, tour: "Spiti Valley Expedition",
    text: "The Spiti expedition was the trip of a lifetime. Local homestays, fossil trails, raw untouched landscape — I couldn't have asked for a better adventure." },
  { id: 3, name: "Simran Kaur", location: "Chandigarh", avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5, tour: "Leh Ladakh Royal Ride",
    text: "Pangong Lake at sunrise, the world's highest motorable road — every day was postcard-perfect. Seamlessly handled from start to finish. 10/10!" },
  { id: 4, name: "Rohan Sharma", location: "Jaipur", avatar: "https://i.pravatar.cc/100?img=8",
    rating: 5, tour: "Rishikesh River Retreat",
    text: "Rafting, bungee, and tranquil yoga mornings — perfectly balanced. Our guide Ramesh was exceptional. Highly recommended!" },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Traveler Stories</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
            What Our <span className="gradient-text">Travelers Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Featured */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                className="glass-dark rounded-3xl p-8 relative">
                <Quote size={48} className="text-violet-500/30 absolute top-6 right-6" />
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-violet-500" />
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-white/40 text-sm">{t.location}</p>
                    <p className="text-violet-400 text-xs mt-0.5">📍 {t.tour}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-6">
              <button onClick={() => setActive(a => (a === 0 ? testimonials.length - 1 : a - 1))}
                className="w-10 h-10 glass rounded-full text-white hover:bg-white/10 transition flex items-center justify-center">←</button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-violet-400" : "w-2 bg-white/20"}`} />
                ))}
              </div>
              <button onClick={() => setActive(a => (a + 1) % testimonials.length)}
                className="w-10 h-10 glass rounded-full text-white hover:bg-white/10 transition flex items-center justify-center">→</button>
            </div>
          </div>

          {/* Thumbs */}
          <div className="flex flex-col gap-3">
            {testimonials.map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-300 ${i === active ? "glass border-violet-500/50 border" : "glass-dark hover:bg-white/5"}`}>
                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-white/40 text-xs truncate">{r.tour}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
