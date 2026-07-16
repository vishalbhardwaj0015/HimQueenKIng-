import { useState } from "react";
import { motion } from "framer-motion";
import { Mountain, Clock, TrendingUp, Calendar, Search } from "lucide-react";

const allTreks = [
  { id: 1, title: "Hampta Pass Trek", difficulty: "Moderate", duration: "5D / 4N", altitude: "14,100 ft", bestTime: "Jun – Oct", price: 8499, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", desc: "One of the most dramatic crossover treks in Himachal. Traverses from lush green meadows of Kullu to the cold desert of Lahaul.", region: "Himachal Pradesh" },
  { id: 2, title: "Kheerganga & Parvati Valley", difficulty: "Easy", duration: "2D / 1N", altitude: "9,700 ft", bestTime: "Apr – Nov", price: 3499, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80", desc: "An iconic alpine trek inside Parvati Valley. Reaches a scenic meadow famous for its healing hot springs.", region: "Himachal Pradesh" },
  { id: 3, title: "Triund Ridge Expedition", difficulty: "Easy", duration: "2D / 1N", altitude: "9,350 ft", bestTime: "Mar – Dec", price: 2999, image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=700&q=80", desc: "The crown jewel of Dharamshala with majestic panoramic views of the Dhauladhar range.", region: "Himachal Pradesh" },
  { id: 4, title: "Chopta Tungnath Trek", difficulty: "Easy", duration: "3D / 2N", altitude: "12,083 ft", bestTime: "Mar – Jun", price: 5499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", desc: "Trek to the highest Shiva temple in the world through lush green meadows of Chopta.", region: "Uttarakhand" },
  { id: 5, title: "Rohtang Pass Trek", difficulty: "Challenging", duration: "4D / 3N", altitude: "13,051 ft", bestTime: "May – Oct", price: 7999, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80", desc: "A breathtaking trek to one of the most famous passes in the Himalayas with stunning glacier views.", region: "Himachal Pradesh" },
  { id: 6, title: "Brahmatal Trek", difficulty: "Moderate", duration: "6D / 5N", altitude: "12,250 ft", bestTime: "Jan – Mar", price: 9499, image: "https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=700&q=80", desc: "A winter wonderland trek with frozen lakes and stunning views of Trishul and Nanda Ghunti peaks.", region: "Uttarakhand" },
  { id: 7, title: "Pin Parvati Pass", difficulty: "Challenging", duration: "8D / 7N", altitude: "17,453 ft", bestTime: "Jul – Sep", price: 14999, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", desc: "The ultimate crossover trek connecting Parvati Valley to Spiti through a dramatic high-altitude pass.", region: "Himachal Pradesh" },
  { id: 8, title: "Valley of Flowers Trek", difficulty: "Moderate", duration: "6D / 5N", altitude: "14,100 ft", bestTime: "Jul – Sep", price: 8999, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80", desc: "UNESCO World Heritage trek through a stunning meadow of hundreds of species of wildflowers.", region: "Uttarakhand" },
];

const difficulties = ["All", "Easy", "Moderate", "Challenging"];

const diffColor: Record<string, string> = { Easy: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30", Moderate: "text-amber-500 bg-amber-50 dark:bg-amber-900/30", Challenging: "text-orange-500 bg-orange-50 dark:bg-orange-900/30" };

const Treks = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allTreks.filter((t) => {
    const matchDiff = filter === "All" || t.difficulty === filter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.region.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Trek Adventures</h1>
          <p className="text-white/80 max-w-lg">Challenge yourself with breathtaking Himalayan treks for every level</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8">
          <Search size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
          <input type="text" placeholder="Search treks by name or region..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map((d) => (
            <button key={d} onClick={() => setFilter(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === d ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((trek, i) => (
            <motion.div key={trek.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img src={trek.image} alt={trek.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold ${diffColor[trek.difficulty]}`}>{trek.difficulty}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{trek.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{trek.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Clock size={11} /> {trek.duration}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={11} /> {trek.altitude}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> {trek.bestTime}</span>
                  <span className="flex items-center gap-1"><Mountain size={11} /> {trek.region}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xl font-black text-emerald-600">₹{trek.price.toLocaleString()}</p>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:shadow-lg transition-all">
                    Book Trek
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
