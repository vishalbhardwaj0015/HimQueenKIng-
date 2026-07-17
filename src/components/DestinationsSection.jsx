import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations, budgetRanges } from "../data/travelData";

const filters = [
  { key: "All", label: "All" },
  { key: "budget", label: "Budget" },
  { key: "mid", label: "Mid Range" },
  { key: "premium", label: "Premium" },
  { key: "luxury", label: "Luxury" },
];

const DestinationCard = ({ dest, index }) => (
  <motion.article className="card group"
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.08, duration: 0.5 }}>
    <Link to={`/destinations/${dest.id}`}>
      <div className="relative overflow-hidden h-56">
        <img src={dest.image} alt={dest.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <span className={`absolute top-3 left-3 ${dest.badgeBg} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {dest.badge}
        </span>
        <span className={`absolute top-3 right-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${budgetRanges[dest.budget].color}`}>
          {budgetRanges[dest.budget].label}
        </span>
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {dest.tags.map(t => (
            <span key={t} className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2.5 py-0.5 rounded-full font-medium">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1.5">
          <MapPin size={12} /> {dest.region}
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#b8860b] transition-colors">{dest.name}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Star size={12} fill="#f59e0b" color="#f59e0b" />
          <span className="font-semibold text-gray-900">{dest.rating}</span>
          <span>({dest.reviews.toLocaleString()} reviews)</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{dest.region}</span>
          <span className="text-[#b8860b] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Explore <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

const DestinationsSection = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? destinations : destinations.filter(d => d.budget === filter);

  return (
    <section className="py-24 px-4 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Popular Destinations</span>
          <h2 className="section-title mt-2 mb-4">
            Explore <span className="text-[#b8860b]">Top Places</span>
          </h2>
          <p className="section-subtitle mx-auto">Handpicked destinations loved by thousands of travelers from around the world</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === f.key
                  ? "bg-[#b8860b] text-white border-[#b8860b] shadow-md shadow-[#b8860b]/15"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#b8860b] hover:text-[#b8860b]"
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest, i) => <DestinationCard key={dest.id} dest={dest} index={i} />)}
        </div>

        <div className="text-center mt-10">
          <Link to="/destinations" className="btn-outline">
            View All Destinations <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
