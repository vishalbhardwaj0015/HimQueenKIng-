import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Mountain, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  { id: 1, title: "Manali Snow Adventure", duration: "6D/5N", groupSize: "2–12",
    difficulty: "Moderate", rating: 4.9, reviews: 312, originalPrice: 18999, price: 14999,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&q=80",
    highlights: ["Solang Valley Snow Activities","Rohtang Pass Excursion","Old Manali Café Tour","Hadimba Temple Visit"],
    includes: ["Hotel","Meals","Transport","Guide"], badge: "Most Booked", color: "from-violet-600 to-indigo-600" },
  { id: 2, title: "Spiti Valley Expedition", duration: "9D/8N", groupSize: "4–16",
    difficulty: "Challenging", rating: 4.8, reviews: 189, originalPrice: 28999, price: 22999,
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80",
    highlights: ["Key Monastery Visit","Chandratal Lake Trek","Kaza Village Exploration","Fossil Trail Discovery"],
    includes: ["Homestay","All Meals","4WD Jeep","Expert Guide"], badge: "Adventure Pick", color: "from-purple-600 to-pink-600" },
  { id: 3, title: "Leh Ladakh Royal Ride", duration: "10D/9N", groupSize: "6–20",
    difficulty: "Hard", rating: 4.9, reviews: 540, originalPrice: 34999, price: 26999,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=700&q=80",
    highlights: ["Pangong Lake Sunrise","Khardung La Pass","Nubra Valley Camel Safari","Magnetic Hill"],
    includes: ["Resort","Breakfast & Dinner","Bike/SUV","Permits"], badge: "Premium", color: "from-pink-600 to-rose-600" },
];

const difficultyClass = { Easy: "text-emerald-400", Moderate: "text-amber-400", Challenging: "text-orange-400", Hard: "text-red-400" };

const TourPackageCard = ({ pkg, index }) => {
  const [expanded, setExpanded] = useState(false);
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  return (
    <motion.article className="glass-dark rounded-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={{ y: -6 }}>
      <div className="relative h-56 overflow-hidden">
        <img src={pkg.image} alt={pkg.title} loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 bg-gradient-to-r ${pkg.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>{pkg.badge}</span>
        <span className={`absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold ${difficultyClass[pkg.difficulty]} bg-black/50 backdrop-blur px-2 py-1 rounded-full`}>
          <Mountain size={11} /> {pkg.difficulty}
        </span>
        {discount > 0 && (
          <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{discount}% OFF</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-xl mb-3">{pkg.title}</h3>
        <div className="flex flex-wrap gap-3 text-white/50 text-xs mb-4">
          <span className="flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {pkg.groupSize} People</span>
          <span className="flex items-center gap-1"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {pkg.rating} ({pkg.reviews})</span>
        </div>

        <ul className="space-y-1.5 mb-3">
          {pkg.highlights.slice(0, expanded ? pkg.highlights.length : 2).map(h => (
            <li key={h} className="flex items-center gap-2 text-white/70 text-sm">
              <CheckCircle2 size={13} className="text-violet-400 shrink-0" /> {h}
            </li>
          ))}
        </ul>
        {pkg.highlights.length > 2 && (
          <button onClick={() => setExpanded(e => !e)} className="text-violet-400 text-xs mb-3 text-left hover:text-violet-300 transition">
            {expanded ? "Show less ▲" : `+${pkg.highlights.length - 2} more ▼`}
          </button>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {pkg.includes.map(inc => (
            <span key={inc} className="bg-white/5 border border-white/10 text-white/60 text-xs px-2.5 py-1 rounded-full">{inc}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="text-white/30 line-through text-xs">₹{pkg.originalPrice.toLocaleString()}</span>
            <div>
              <span className="text-white font-bold text-xl">₹{pkg.price.toLocaleString()}</span>
              <span className="text-white/40 text-xs">/person</span>
            </div>
          </div>
          <Link to={`/tours/${pkg.id}`}
            className={`bg-gradient-to-r ${pkg.color} text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm hover:opacity-90 transition`}>
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const TourPackagesSection = () => (
  <section id="packages" className="py-24 px-4 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <span className="text-pink-400 text-sm font-semibold tracking-widest uppercase">Curated Packages</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Our <span className="gradient-text">Best Packages</span>
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">All-inclusive travel packages for the ultimate Himalayan experience</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, i) => <TourPackageCard key={pkg.id} pkg={pkg} index={i} />)}
      </div>
    </div>
  </section>
);

export default TourPackagesSection;
