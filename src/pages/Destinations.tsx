import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Heart, Search, Filter } from "lucide-react";
import { destinations } from "../data/travelData";

const tags = ["All", "Mountains", "Adventure", "Spiritual", "Trekking", "Backpacking", "Culture", "Remote"];

const Destinations = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(new Set());

  const filtered = destinations.filter((d) => {
    const matchTag = filter === "All" || d.tags.includes(filter as any);
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">All Destinations</h1>
          <p className="text-white/80 max-w-lg">Discover handpicked Himalayan destinations loved by thousands of travelers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search destinations by name or region..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === t ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
              <Link to={`/destinations/${dest.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white ${dest.badgeBg}`}>{dest.badge}</span>
                  <button onClick={(e) => { e.preventDefault(); toggleLike(dest.id); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors">
                    <Heart size={15} fill={liked.has(dest.id) ? "#ef4444" : "none"} className={liked.has(dest.id) ? "text-red-500" : "text-white"} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                    {dest.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                  <MapPin size={12} /> {dest.region}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{dest.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{dest.desc}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span className="text-sm font-semibold text-gray-900">{dest.rating}</span>
                  <span className="text-xs text-gray-400">({dest.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400">From</span>
                    <p className="text-xl font-black text-orange-600">₹{dest.price.toLocaleString()}</p>
                  </div>
                  <Link to={`/destinations/${dest.id}`} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all active:scale-[0.97]">
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
