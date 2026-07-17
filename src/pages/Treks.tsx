import { useState } from "react";
import { motion } from "framer-motion";
import { Mountain, Clock, TrendingUp, Calendar, Search, ArrowRight, MessageCircle } from "lucide-react";
import { budgetRanges, BudgetLevel } from "../data/travelData";

const allTreks = [
  { id: 1, title: "Hampta Pass Trek", difficulty: "Moderate", duration: "5D / 4N", altitude: "14,100 ft", bestTime: "Jun – Oct", budget: "mid" as BudgetLevel, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", desc: "One of the most dramatic crossover treks in Himachal. Traverses from lush green meadows of Kullu to the cold desert of Lahaul.", region: "Himachal Pradesh" },
  { id: 2, title: "Kheerganga & Parvati Valley", difficulty: "Easy", duration: "2D / 1N", altitude: "9,700 ft", bestTime: "Apr – Nov", budget: "budget" as BudgetLevel, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80", desc: "An iconic alpine trek inside Parvati Valley. Reaches a scenic meadow famous for its healing hot springs.", region: "Himachal Pradesh" },
  { id: 3, title: "Triund Ridge Expedition", difficulty: "Easy", duration: "2D / 1N", altitude: "9,350 ft", bestTime: "Mar – Dec", budget: "budget" as BudgetLevel, image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=700&q=80", desc: "The crown jewel of Dharamshala with majestic panoramic views of the Dhauladhar range.", region: "Himachal Pradesh" },
  { id: 4, title: "Chopta Tungnath Trek", difficulty: "Easy", duration: "3D / 2N", altitude: "12,083 ft", bestTime: "Mar – Jun", budget: "mid" as BudgetLevel, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", desc: "Trek to the highest Shiva temple in the world through lush green meadows of Chopta.", region: "Uttarakhand" },
  { id: 5, title: "Rohtang Pass Trek", difficulty: "Challenging", duration: "4D / 3N", altitude: "13,051 ft", bestTime: "May – Oct", budget: "mid" as BudgetLevel, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80", desc: "A breathtaking trek to one of the most famous passes in the Himalayas with stunning glacier views.", region: "Himachal Pradesh" },
  { id: 6, title: "Brahmatal Trek", difficulty: "Moderate", duration: "6D / 5N", altitude: "12,250 ft", bestTime: "Jan – Mar", budget: "premium" as BudgetLevel, image: "https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=700&q=80", desc: "A winter wonderland trek with frozen lakes and stunning views of Trishul and Nanda Ghunti peaks.", region: "Uttarakhand" },
  { id: 7, title: "Pin Parvati Pass", difficulty: "Challenging", duration: "8D / 7N", altitude: "17,453 ft", bestTime: "Jul – Sep", budget: "luxury" as BudgetLevel, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", desc: "The ultimate crossover trek connecting Parvati Valley to Spiti through a dramatic high-altitude pass.", region: "Himachal Pradesh" },
  { id: 8, title: "Valley of Flowers Trek", difficulty: "Moderate", duration: "6D / 5N", altitude: "14,100 ft", bestTime: "Jul – Sep", budget: "mid" as BudgetLevel, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80", desc: "UNESCO World Heritage trek through a stunning meadow of hundreds of species of wildflowers.", region: "Uttarakhand" },
];

const difficulties = ["All", "Easy", "Moderate", "Challenging"];
const budgetLevels: { key: string; label: string }[] = [
  { key: "All", label: "All Budgets" },
  { key: "budget", label: "Budget" },
  { key: "mid", label: "Mid Range" },
  { key: "premium", label: "Premium" },
  { key: "luxury", label: "Luxury" },
];
const diffColor: Record<string, string> = { Easy: "text-green-600 bg-green-50", Moderate: "text-amber-600 bg-amber-50", Challenging: "text-orange-600 bg-orange-50" };

const Treks = () => {
  const [diffFilter, setDiffFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allTreks.filter((t) => {
    const matchDiff = diffFilter === "All" || t.difficulty === diffFilter;
    const matchBudget = budgetFilter === "All" || t.budget === budgetFilter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.region.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchBudget && matchSearch;
  });

  const handleEnquire = (trek: typeof allTreks[0]) => {
    const msg = `Hi! I'm interested in the ${trek.title} (${trek.difficulty}, ${trek.duration}). Can you share budget details?`;
    window.open(`https://wa.me/919805556015?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6]">
      <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Trek Adventures</h1>
          <p className="text-gray-300 max-w-lg">Challenge yourself with breathtaking Himalayan treks for every level</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-6 border border-gray-100">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search treks by name or region..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm" />
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
          {difficulties.map((d) => (
            <button key={d} onClick={() => setDiffFilter(d)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              diffFilter === d ? "bg-[#1a1a2e] text-white border-[#1a1a2e]" : "bg-white text-gray-600 hover:border-[#1a1a2e] hover:text-[#1a1a2e] border-gray-200"
            }`}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((trek, i) => (
            <motion.div key={trek.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card group">
              <div className="relative h-48 overflow-hidden">
                <img src={trek.image} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${diffColor[trek.difficulty]}`}>{trek.difficulty}</span>
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${budgetRanges[trek.budget].color}`}>
                  {budgetRanges[trek.budget].label}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#b8860b] transition-colors">{trek.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{trek.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={11} /> {trek.duration}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={11} /> {trek.altitude}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> {trek.bestTime}</span>
                  <span className="flex items-center gap-1"><Mountain size={11} /> {trek.region}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${budgetRanges[trek.budget].color} text-white`}>
                    {budgetRanges[trek.budget].label}
                  </span>
                  <button onClick={() => handleEnquire(trek)} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BD5A] transition-all">
                    <MessageCircle size={12} /> Enquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treks;
