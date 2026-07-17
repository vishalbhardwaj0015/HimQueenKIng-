import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { id: 1, name: "Sarah Mitchell", location: "London, UK", avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5, tour: "Leh Ladakh Royal Ride",
    text: "An absolutely incredible experience! The team took care of every detail — from the stunning Pangong Lake sunrise to crossing the world's highest motorable pass. This trip exceeded all my expectations." },
  { id: 2, name: "Marcus Weber", location: "Berlin, Germany", avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5, tour: "Spiti Valley Expedition",
    text: "Spiti was the highlight of my India trip. The local homestays, ancient monasteries, and raw untouched landscape made this the most authentic adventure I've ever had. Highly recommended!" },
  { id: 3, name: "Emily Chen", location: "Sydney, Australia", avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5, tour: "Manali Snow Adventure",
    text: "From snow-capped Rohtang Pass to cozy Old Manali cafés — every day was magical. The guides were knowledgeable and friendly. Will definitely book again for my next Himalayan adventure." },
  { id: 4, name: "James Anderson", location: "New York, USA", avatar: "https://i.pravatar.cc/100?img=8",
    rating: 5, tour: "Rishikesh River Retreat",
    text: "Perfect blend of adventure and tranquility. Rafting on the Ganges, bungee jumping, and peaceful yoga mornings — this trip had it all. The team was professional from start to finish." },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-24 px-4 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Traveler Stories</span>
          <h2 className="section-title mt-2">
            What Our <span className="text-[#b8860b]">Travelers Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Featured */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 relative border border-gray-100 shadow-sm">
                <Quote size={40} className="text-[#b8860b]/10 absolute top-6 right-6" />
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-gray-100" />
                  <div>
                    <p className="text-gray-900 font-bold">{t.name}</p>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                    <p className="text-[#b8860b] text-xs mt-0.5 font-medium">{t.tour}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-6">
              <button onClick={() => setActive(a => (a === 0 ? testimonials.length - 1 : a - 1))}
                className="w-10 h-10 border border-gray-200 rounded-full text-gray-500 hover:border-[#b8860b] hover:text-[#b8860b] transition flex items-center justify-center bg-white">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#b8860b]" : "w-1.5 bg-gray-300"}`} />
                ))}
              </div>
              <button onClick={() => setActive(a => (a + 1) % testimonials.length)}
                className="w-10 h-10 border border-gray-200 rounded-full text-gray-500 hover:border-[#b8860b] hover:text-[#b8860b] transition flex items-center justify-center bg-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Thumbs */}
          <div className="flex flex-col gap-3">
            {testimonials.map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 border ${
                  i === active ? "bg-white border-[#b8860b]/30 shadow-sm" : "bg-white border-gray-100 hover:border-gray-200"
                }`}>
                <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs truncate">{r.tour}</p>
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
