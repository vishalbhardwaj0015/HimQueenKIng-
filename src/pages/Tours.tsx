import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, ArrowRight, MapPin, Mountain, Search } from "lucide-react";
import { tours } from "../data/travelData";

const difficulties = ["All", "Easy", "Moderate", "Challenging", "Hard"];

const Tours = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [diffFilter, setDiffFilter] = useState("All");
  const [search, setSearch] = useState(initialSearch);

  const filtered = tours.filter((t) => {
    const matchDiff = diffFilter === "All" || t.difficulty === diffFilter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  const diffColor = { Easy: "text-green-600 bg-green-50", Moderate: "text-amber-600 bg-amber-50", Challenging: "text-orange-600 bg-orange-50", Hard: "text-red-600 bg-red-50" };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6] dark:bg-[#0f0f1a]">
      <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Tour Packages</h1>
          <p className="text-gray-300 max-w-lg">Handcrafted all-inclusive tours through Himachal Pradesh & Uttarakhand</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8 border border-gray-100 dark:border-gray-700">
          <Search size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
          <input type="text" placeholder="Search tours by name or destination..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map((d) => (
            <button key={d} onClick={() => setDiffFilter(d)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              diffFilter === d ? "bg-[#b8860b] text-white border-[#b8860b]" : "bg-white dark:bg-[#1a1a2e] text-gray-600 dark:text-gray-400 hover:border-[#b8860b] hover:text-[#b8860b] border-gray-200 dark:border-gray-700"
            }`}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour, i) => (
            <motion.article key={tour.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card group">
              <Link to={`/tours/${tour.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#b8860b] text-white text-xs font-semibold px-3 py-1 rounded-full">{tour.badge}</span>
                  <span className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${diffColor[tour.difficulty]}`}>
                    <Mountain size={11} /> {tour.difficulty}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <MapPin size={12} /> {tour.destination}
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#b8860b] transition-colors">
                  <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
                </h3>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {tour.group}</span>
                  <span className="flex items-center gap-1"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {tour.rating} ({tour.reviews})</span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {tour.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-400 dark:text-gray-500">{tour.duration} · {tour.difficulty}</div>
                  <Link to={`/tours/${tour.id}`} className="btn-primary text-sm !py-2.5 !px-5">
                    Get Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <p className="text-lg font-medium">No tours match your filters</p>
            <p className="text-sm">Try adjusting your difficulty filter or search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
