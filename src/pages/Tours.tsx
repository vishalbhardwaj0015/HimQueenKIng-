import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, ArrowRight, MapPin, Mountain, Search } from "lucide-react";
import { tours } from "../data/travelData";

const difficulties = ["All", "Easy", "Moderate", "Challenging", "Hard"];

const Tours = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tours.filter((t) => {
    const matchDiff = filter === "All" || t.difficulty === filter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  const diffColor: Record<string, string> = { Easy: "text-emerald-500 bg-emerald-50", Moderate: "text-amber-500 bg-amber-50", Challenging: "text-orange-500 bg-orange-50", Hard: "text-red-500 bg-red-50" };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Tour Packages</h1>
          <p className="text-white/80 max-w-lg">Curated all-inclusive tours through the majestic Himalayas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search tours by name or destination..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map((d) => (
            <button key={d} onClick={() => setFilter(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === d ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour, i) => {
            const discount = Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100);
            return (
              <motion.article key={tour.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <Link to={`/tours/${tour.id}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${tour.color}`}>{tour.badge}</span>
                    <span className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${diffColor[tour.difficulty]}`}>
                      <Mountain size={11} /> {tour.difficulty}
                    </span>
                    {discount > 0 && <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-red-500 text-white text-[11px] font-bold">-{discount}% OFF</span>}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
                      <MapPin size={12} /> {tour.destination}
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {tour.group}</span>
                    <span className="flex items-center gap-1"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {tour.rating} ({tour.reviews})</span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {tour.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tour.includes.map((inc) => (
                      <span key={inc} className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium">{inc}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 line-through">₹{tour.originalPrice.toLocaleString()}</span>
                      <p className="text-2xl font-black text-gray-900">₹{tour.price.toLocaleString()}</p>
                    </div>
                    <Link to={`/tours/${tour.id}`} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all active:scale-[0.97]">
                      View Details <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tours;
