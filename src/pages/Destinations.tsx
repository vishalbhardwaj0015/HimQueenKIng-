import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Search, Filter } from "lucide-react";
import { destinations, budgetRanges } from "../data/travelData";

const tags = ["All", "Mountains", "Adventure", "Spiritual", "Trekking", "Backpacking", "Culture", "Remote"];
const budgetLevels: { key: string; label: string }[] = [
  { key: "All", label: "All Budgets" },
  { key: "budget", label: "Budget" },
  { key: "mid", label: "Mid Range" },
  { key: "premium", label: "Premium" },
  { key: "luxury", label: "Luxury" },
];

const Destinations = () => {
  const [filter, setFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = destinations.filter((d) => {
    const matchTag = filter === "All" || d.tags.includes(filter as any);
    const matchBudget = budgetFilter === "All" || d.budget === budgetFilter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchBudget && matchSearch;
  });

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6]">
      <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">All Destinations</h1>
          <p className="text-gray-300 max-w-lg">Discover handpicked Himalayan destinations loved by travelers worldwide</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-6 border border-gray-100">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search destinations by name or region..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {budgetLevels.map((b) => (
            <button key={b.key} onClick={() => setBudgetFilter(b.key)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              budgetFilter === b.key ? "bg-[#b8860b] text-white border-[#b8860b]" : "bg-white text-gray-600 hover:border-[#b8860b] hover:text-[#b8860b] border-gray-200"
            }`}>
              {b.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              filter === t ? "bg-[#1a1a2e] text-white border-[#1a1a2e]" : "bg-white text-gray-600 hover:border-[#1a1a2e] hover:text-[#1a1a2e] border-gray-200"
            }`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card group">
              <Link to={`/destinations/${dest.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${dest.badgeBg}`}>{dest.badge}</span>
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${budgetRanges[dest.budget].color}`}>
                    {budgetRanges[dest.budget].label}
                  </span>
                  <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                    {dest.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1.5">
                  <MapPin size={12} /> {dest.region}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#b8860b] transition-colors">{dest.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{dest.desc}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span className="text-sm font-semibold text-gray-900">{dest.rating}</span>
                  <span className="text-xs text-gray-400">({dest.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{dest.badge} · {dest.region}</span>
                  <Link to={`/destinations/${dest.id}`} className="btn-primary text-sm !py-2.5 !px-5">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Filter size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No destinations found</p>
            <p className="text-sm">Try adjusting your filters or search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
