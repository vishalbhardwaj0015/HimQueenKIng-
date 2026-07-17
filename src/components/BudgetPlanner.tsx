import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, MapPin, Star, Zap } from "lucide-react";
import { tours, destinations, budgetRanges } from "../data/travelData";
import type { BudgetLevel } from "../data/travelData";

const budgetOptions: { key: BudgetLevel; icon: string; desc: string }[] = [
  { key: "budget", icon: "🎒", desc: "Backpacker-friendly stays, shared transport, and the best of nature on a shoestring." },
  { key: "mid", icon: "🏖️", desc: "Comfortable hotels, private cabs, curated sightseeing — great value for money." },
  { key: "premium", icon: "✨", desc: "Premium resorts, exclusive experiences, and personalized attention throughout." },
  { key: "luxury", icon: "👑", desc: "5-star stays, private helicopter transfers, and bespoke luxury itineraries." },
];

const BudgetPlanner = () => {
  const [selected, setSelected] = useState<BudgetLevel | null>(null);

  const matchingTours = selected ? tours.filter(t => t.budget === selected) : [];
  const matchingDest = selected ? destinations.filter(d => d.budget === selected) : [];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Budget Planner</span>
          <h2 className="section-title mt-2 mb-4">
            Where Does Your <span className="text-[#b8860b]">Budget Fit?</span>
          </h2>
          <p className="section-subtitle mx-auto">Tell us your budget range and we'll show you the best tours and destinations that match — no surprises, no hidden costs.</p>
        </motion.div>

        {/* Budget Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {budgetOptions.map((opt) => {
            const r = budgetRanges[opt.key];
            const isActive = selected === opt.key;
            return (
              <motion.button key={opt.key}
                onClick={() => setSelected(isActive ? null : opt.key)}
                whileHover={{ y: -4 }}
                className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-[#b8860b] bg-[#b8860b]/5 shadow-lg shadow-[#b8860b]/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}>
                <span className="text-3xl mb-3 block">{opt.icon}</span>
                <div className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold text-white mb-3 ${r.color}`}>
                  {r.range}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${isActive ? "text-[#b8860b]" : "text-gray-900"}`}>{r.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{opt.desc}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Results */}
        {selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Tours */}
            {matchingTours.length > 0 && (
              <div className="mb-12">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-[#b8860b]" /> Matching Tours ({matchingTours.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchingTours.map((tour) => (
                    <Link to={`/tours/${tour.id}`} key={tour.id} className="card group">
                      <div className="relative h-48 overflow-hidden">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute top-3 left-3 bg-[#b8860b] text-white text-xs font-semibold px-3 py-1 rounded-full">{tour.badge}</span>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#b8860b] transition-colors">{tour.title}</h4>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1"><Clock size={11} /> {tour.duration}</span>
                          <span className="flex items-center gap-1"><Users size={11} /> {tour.group}</span>
                          <span className="flex items-center gap-1"><Star size={11} fill="#f59e0b" color="#f59e0b" /> {tour.rating}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin size={11} /> {tour.destination}
                          </div>
                          <span className="text-[#b8860b] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Destinations */}
            {matchingDest.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-[#b8860b]" /> Matching Destinations ({matchingDest.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchingDest.map((dest) => (
                    <Link to={`/destinations/${dest.id}`} key={dest.id} className="card group">
                      <div className="relative h-48 overflow-hidden">
                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <span className={`absolute top-3 left-3 ${dest.badgeBg} text-white text-xs font-semibold px-3 py-1 rounded-full`}>{dest.badge}</span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                          <MapPin size={11} /> {dest.region}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#b8860b] transition-colors">{dest.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                          <Star size={11} fill="#f59e0b" color="#f59e0b" />
                          <span className="font-semibold text-gray-900">{dest.rating}</span>
                          <span>({dest.reviews.toLocaleString()} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex flex-wrap gap-1">
                            {dest.tags.slice(0, 2).map(t => (
                              <span key={t} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{t}</span>
                            ))}
                          </div>
                          <span className="text-[#b8860b] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Explore <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-[#f5f0e8] rounded-2xl p-8 text-center">
              <p className="text-gray-600 mb-4">Didn't find exactly what you're looking for? We can customize any trip to fit your budget.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/dream-destination" className="btn-primary">
                  Get Custom Itinerary <ArrowRight size={16} />
                </Link>
                <a href="https://wa.me/919805556015?text=Hi! I'm interested in a tour within my budget. Can you help?" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {!selected && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-400 text-lg">👆 Select a budget range above to see matching tours and destinations</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BudgetPlanner;
