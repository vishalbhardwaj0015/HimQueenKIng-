import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Search } from "lucide-react";
import { hotels, budgetRanges } from "../data/travelData";

const budgetLevels: { key: string; label: string }[] = [
  { key: "All", label: "All Budgets" },
  { key: "budget", label: "Budget" },
  { key: "mid", label: "Mid Range" },
  { key: "premium", label: "Premium" },
  { key: "luxury", label: "Luxury" },
];

const Hotels = () => {
  const [search, setSearch] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("All");

  const filtered = hotels.filter((h) => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase());
    const matchBudget = budgetFilter === "All" || h.budget === budgetFilter;
    return matchSearch && matchBudget;
  });

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6]">
      <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Hotels & Stays</h1>
          <p className="text-gray-300 max-w-lg">Handpicked accommodations for the ultimate Himalayan experience</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-6 border border-gray-100">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search hotels by name or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {budgetLevels.map((b) => (
            <button key={b.key} onClick={() => setBudgetFilter(b.key)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              budgetFilter === b.key ? "bg-[#b8860b] text-white border-[#b8860b]" : "bg-white text-gray-600 hover:border-[#b8860b] hover:text-[#b8860b] border-gray-200"
            }`}>
              {b.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((hotel, i) => (
            <motion.div key={hotel.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card group">
              <Link to={`/hotels/${hotel.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${hotel.badgeColor}`}>{hotel.badge}</span>
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${budgetRanges[hotel.budget].color}`}>
                    {budgetRanges[hotel.budget].label}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                    <MapPin size={12} /> {hotel.location}
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span className="text-sm font-semibold text-gray-900">{hotel.rating}</span>
                  <span className="text-xs text-gray-400">({hotel.reviews} reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#b8860b] transition-colors">{hotel.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{hotel.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {hotel.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{a}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{hotel.badge} · {hotel.rating}★</span>
                  <Link to={`/hotels/${hotel.id}`} className="btn-primary text-sm !py-2.5 !px-5">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No hotels match your filters</p>
            <p className="text-sm">Try adjusting your budget filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
