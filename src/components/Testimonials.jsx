import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Camera } from "lucide-react";
import ReviewForm from "./ReviewForm";

const fallbackReviews = [
  { id: 1, name: "Sarah Mitchell", location: "London, UK", tour: "Leh Ladakh Royal Ride", rating: 5,
    text: "An absolutely incredible experience! The team took care of every detail — from the stunning Pangong Lake sunrise to crossing the world's highest motorable pass. This trip exceeded all my expectations." },
  { id: 2, name: "Marcus Weber", location: "Berlin, Germany", tour: "Spiti Valley Expedition", rating: 5,
    text: "Spiti was the highlight of my India trip. The local homestays, ancient monasteries, and raw untouched landscape made this the most authentic adventure I've ever had. Highly recommended!" },
  { id: 3, name: "Emily Chen", location: "Sydney, Australia", tour: "Manali Snow Adventure", rating: 5,
    text: "From snow-capped Rohtang Pass to cozy Old Manali cafés — every day was magical. The guides were knowledgeable and friendly. Will definitely book again for my next Himalayan adventure." },
  { id: 4, name: "James Anderson", location: "New York, USA", tour: "Rishikesh River Retreat", rating: 5,
    text: "Perfect blend of adventure and tranquility. Rafting on the Ganges, bungee jumping, and peaceful yoga mornings — this trip had it all. The team was professional from start to finish." },
];

const getInitials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [active, setActive] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then((data) => { if (data.length > 0) setReviews(data); })
      .catch(() => {});
  }, []);

  const allReviews = reviews.length > 0 ? reviews : fallbackReviews;
  const t = allReviews[active] || fallbackReviews[0];

  return (
    <section className="py-24 px-4 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Traveler Stories</span>
          <h2 className="section-title mt-2">
            What Our <span className="text-[#b8860b]">Travelers Say</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Featured Review */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 relative border border-gray-100 shadow-sm">
                <Quote size={40} className="text-[#b8860b]/10 absolute top-6 right-6" />
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, i) => (
                    <Star key={`empty-${i}`} size={16} color="#e5e7eb" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-sm font-bold border-2 border-gray-100">
                      {getInitials(t.name)}
                    </div>
                  )}
                  <div>
                    <p className="text-gray-900 font-bold">{t.name}</p>
                    {t.location && <p className="text-gray-400 text-sm flex items-center gap-1"><MapPin size={11} /> {t.location}</p>}
                    {t.tour && <p className="text-[#b8860b] text-xs mt-0.5 font-medium">{t.tour}</p>}
                  </div>
                  {t.photo && (
                    <span className="ml-auto text-xs text-gray-400 flex items-center gap-1"><Camera size={11} /> Traveler photo</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-6">
              <button onClick={() => setActive(a => (a === 0 ? allReviews.length - 1 : a - 1))}
                className="w-10 h-10 border border-gray-200 rounded-full text-gray-500 hover:border-[#b8860b] hover:text-[#b8860b] transition flex items-center justify-center bg-white">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2 flex-wrap">
                {allReviews.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#b8860b]" : "w-1.5 bg-gray-300"}`} />
                ))}
              </div>
              <button onClick={() => setActive(a => (a + 1) % allReviews.length)}
                className="w-10 h-10 border border-gray-200 rounded-full text-gray-500 hover:border-[#b8860b] hover:text-[#b8860b] transition flex items-center justify-center bg-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar: Thumbnails + Write Review */}
          <div className="flex flex-col gap-3">
            {allReviews.slice(0, 4).map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 border ${
                  i === active ? "bg-white border-[#b8860b]/30 shadow-sm" : "bg-white border-gray-100 hover:border-gray-200"
                }`}>
                {r.photo ? (
                  <img src={r.photo} alt={r.name} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {getInitials(r.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs truncate">{r.tour || r.text.slice(0, 40) + "..."}</p>
                </div>
              </button>
            ))}

            {/* Write Review Button */}
            <button onClick={() => setShowForm(!showForm)}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-all ${
                showForm ? "border-[#b8860b] text-[#b8860b] bg-[#b8860b]/5" : "border-gray-300 text-gray-500 hover:border-[#b8860b] hover:text-[#b8860b]"
              }`}>
              <Star size={16} /> {showForm ? "Hide Form" : "Write a Review"}
            </button>
          </div>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}
              className="overflow-hidden mt-8">
              <div className="max-w-2xl mx-auto">
                <ReviewForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
