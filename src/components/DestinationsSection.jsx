import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Heart } from "lucide-react";

const destinations = [
  { id: 1, name: "Manali", country: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    rating: 4.9, reviews: 2140, price: 12999, badge: "Bestseller", badgeColor: "bg-amber-500",
    tags: ["Mountains", "Snow", "Adventure"] },
  { id: 2, name: "Spiti Valley", country: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&q=80",
    rating: 4.8, reviews: 870, price: 18499, badge: "Off-Beat", badgeColor: "bg-violet-500",
    tags: ["Desert", "Culture", "Remote"] },
  { id: 3, name: "Kasol", country: "Parvati Valley",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    rating: 4.7, reviews: 1390, price: 9499, badge: "Budget Pick", badgeColor: "bg-emerald-500",
    tags: ["Backpacking", "Nature", "Trekking"] },
  { id: 4, name: "Leh Ladakh", country: "Jammu & Kashmir",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80",
    rating: 4.9, reviews: 3200, price: 24999, badge: "Premium", badgeColor: "bg-red-500",
    tags: ["Altitude", "Monastery", "Biking"] },
  { id: 5, name: "Chopta", country: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&q=80",
    rating: 4.6, reviews: 520, price: 7999, badge: "Hidden Gem", badgeColor: "bg-cyan-500",
    tags: ["Camping", "Trekking", "Wildlife"] },
  { id: 6, name: "Rishikesh", country: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    rating: 4.8, reviews: 4100, price: 6499, badge: "Most Popular", badgeColor: "bg-orange-500",
    tags: ["Rafting", "Yoga", "Spiritual"] },
];

const filters = ["All", "Mountains", "Adventure", "Spiritual", "Trekking", "Backpacking"];

const DestinationCard = ({ dest, index }) => {
  const [liked, setLiked] = useState(false);
  return (
    <motion.article className="glass-dark rounded-2xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -6 }}>
      <div className="relative overflow-hidden h-52">
        <img src={dest.image} alt={dest.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <span className={`absolute top-3 left-3 ${dest.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
          {dest.badge}
        </span>
        <button onClick={() => setLiked(l => !l)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/60 transition"
          aria-label="Wishlist">
          <Heart size={14} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "white"} />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
          {dest.tags.map(t => (
            <span key={t} className="bg-black/50 backdrop-blur text-white/80 text-xs px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-white/50 text-xs mb-1">
          <MapPin size={11} /> {dest.country}
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{dest.name}</h3>
        <div className="flex items-center gap-1 text-xs text-white/60 mb-3">
          <Star size={12} fill="#f59e0b" color="#f59e0b" />
          <span className="text-amber-400 font-semibold">{dest.rating}</span>
          <span>({dest.reviews.toLocaleString()} reviews)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/40 text-xs">From </span>
            <span className="text-violet-400 font-bold text-lg">₹{dest.price.toLocaleString()}</span>
            <span className="text-white/40 text-xs">/person</span>
          </div>
          <button className="bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition">
            Book Now
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const DestinationsSection = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? destinations : destinations.filter(d => d.tags.includes(filter));

  return (
    <section id="destinations" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Popular Destinations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Explore <span className="gradient-text">Top Places</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">Handpicked destinations loved by thousands of travelers</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/30"
                  : "glass text-white/60 hover:text-white"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest, i) => <DestinationCard key={dest.id} dest={dest} index={i} />)}
        </div>

        <div className="text-center mt-10">
          <a href="#tours" className="inline-flex items-center gap-2 glass text-white/70 hover:text-white px-6 py-3 rounded-full transition-all hover:bg-white/10">
            View All Destinations →
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
