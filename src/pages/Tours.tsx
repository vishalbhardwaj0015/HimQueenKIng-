import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, ArrowRight, MapPin, Mountain, Search } from "lucide-react";
import { handleBookClick } from "../utils/auth";

const allTours = [
  { id: 1, title: "Manali Snow Adventure", destination: "Manali, HP", duration: "6D / 5N", group: "2–12", difficulty: "Moderate", rating: 4.9, reviews: 312, originalPrice: 18999, price: 14999, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&q=80", highlights: ["Solang Valley Snow Activities", "Rohtang Pass Excursion", "Old Manali Café Tour", "Hadimba Temple Visit"], includes: ["Hotel", "Meals", "Transport", "Guide"], badge: "Most Booked", color: "from-indigo-500 to-indigo-600" },
  { id: 2, title: "Spiti Valley Expedition", destination: "Spiti, HP", duration: "9D / 8N", group: "4–16", difficulty: "Challenging", rating: 4.8, reviews: 189, originalPrice: 28999, price: 22999, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80", highlights: ["Key Monastery Visit", "Chandratal Lake Trek", "Kaza Village", "Fossil Trail"], includes: ["Homestay", "Meals", "4WD Jeep", "Guide"], badge: "Adventure", color: "from-violet-500 to-violet-600" },
  { id: 3, title: "Leh Ladakh Royal Ride", destination: "Ladakh, J&K", duration: "10D / 9N", group: "6–20", difficulty: "Hard", rating: 4.9, reviews: 540, originalPrice: 34999, price: 26999, image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=700&q=80", highlights: ["Pangong Lake Sunrise", "Khardung La Pass", "Nubra Valley Safari", "Magnetic Hill"], includes: ["Resort", "Meals", "Bike/SUV", "Permits"], badge: "Premium", color: "from-pink-500 to-pink-600" },
  { id: 4, title: "Kasol Backpacking Trip", destination: "Kasol, HP", duration: "4D / 3N", group: "2–8", difficulty: "Easy", rating: 4.7, reviews: 890, originalPrice: 8999, price: 6499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", highlights: ["Kheerganga Trek", "Manikaran Sahib", "Riverside Camping", "Café Hopping"], includes: ["Hostel", "Breakfast", "Transport", "Guide"], badge: "Budget", color: "from-emerald-500 to-emerald-600" },
  { id: 5, title: "Shimla Manali Grand Tour", destination: "Shimla & Manali", duration: "7D / 6N", group: "2–15", difficulty: "Easy", rating: 4.8, reviews: 1200, originalPrice: 22999, price: 18999, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80", highlights: ["Mall Road Shimla", "Kufri Snow Point", "Solang Valley", "Old Manali"], includes: ["Hotel", "All Meals", "AC Bus", "Guide"], badge: "Best Value", color: "from-amber-500 to-amber-600" },
  { id: 6, title: "Rishikesh River Retreat", destination: "Rishikesh, UK", duration: "5D / 4N", group: "4–20", difficulty: "Moderate", rating: 4.8, reviews: 670, originalPrice: 14999, price: 11999, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80", highlights: ["White-Water Rafting", "Bungee Jumping", "Yoga Session", "Ganga Aarti"], includes: ["Resort", "Meals", "Activities", "Guide"], badge: "Thrilling", color: "from-cyan-500 to-cyan-600" },
];

const difficulties = ["All", "Easy", "Moderate", "Challenging", "Hard"];

const Tours = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allTours.filter((t) => {
    const matchDiff = filter === "All" || t.difficulty === filter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  const diffColor: Record<string, string> = { Easy: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30", Moderate: "text-amber-500 bg-amber-50 dark:bg-amber-900/30", Challenging: "text-orange-500 bg-orange-50 dark:bg-orange-900/30", Hard: "text-red-500 bg-red-50 dark:bg-red-900/30" };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Tour Packages</h1>
          <p className="text-white/80 max-w-lg">Curated all-inclusive tours through the majestic Himalayas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8">
          <Search size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
          <input type="text" placeholder="Search tours by name or destination..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map((d) => (
            <button key={d} onClick={() => setFilter(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === d ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour, i) => {
            const discount = Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100);
            return (
              <motion.article key={tour.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
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
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{tour.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {tour.group}</span>
                    <span className="flex items-center gap-1"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {tour.rating} ({tour.reviews})</span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {tour.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tour.includes.map((inc) => (
                      <span key={inc} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] font-medium">{inc}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 line-through">₹{tour.originalPrice.toLocaleString()}</span>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">₹{tour.price.toLocaleString()}</p>
                    </div>
                    <button onClick={(e) => handleBookClick(e, `Hi! I want to book "${tour.title}" (${tour.destination}) - ${tour.duration} for ₹${tour.price.toLocaleString()}. Please share booking details.`)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all active:scale-[0.97]">
                      Book Now <ArrowRight size={15} />
                    </button>
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
