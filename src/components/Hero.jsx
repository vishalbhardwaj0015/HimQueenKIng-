import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Discover the", highlight: "Himalayas",
    subtitle: "Where every peak tells a story of wonder and adventure",
    tag: "Mountain Escapes",
  },
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
    title: "Explore Hidden", highlight: "Valleys",
    subtitle: "Untouched beauty, pristine trails, and memories forever",
    tag: "Valley Tours",
  },
  {
    image: "https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=1920&q=80",
    title: "Journey to", highlight: "Sacred Peaks",
    subtitle: "Spiritual trails through the crown of the world",
    tag: "Spiritual Journeys",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* BG */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 1.2 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          <motion.div key={current + "t"} initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }} className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-sm px-4 py-1.5 rounded-full font-medium">
              <MapPin size={13} /> {slide.tag}
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              {slide.title}{" "}
              <span className="gradient-text">{slide.highlight}</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Search Box */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass rounded-2xl p-2 flex flex-col md:flex-row items-stretch gap-2 w-full max-w-4xl">

          <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-3">
            <MapPin size={18} className="text-violet-400 shrink-0" />
            <div className="flex flex-col min-w-0">
              <label className="text-white/50 text-xs font-medium">Destination</label>
              <input className="bg-transparent text-white text-sm outline-none placeholder:text-white/30 w-full"
                placeholder="Where do you want to go?" value={destination}
                onChange={e => setDestination(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-3">
            <Calendar size={18} className="text-pink-400 shrink-0" />
            <div className="flex flex-col min-w-0">
              <label className="text-white/50 text-xs font-medium">Travel Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="bg-transparent text-white text-sm outline-none w-full" />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
            <Users size={18} className="text-emerald-400 shrink-0" />
            <div className="flex flex-col">
              <label className="text-white/50 text-xs font-medium">Guests</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setGuests(g => Math.max(1, g - 1))}
                  className="w-6 h-6 rounded-full bg-white/10 text-white hover:bg-white/20 transition text-sm flex items-center justify-center">−</button>
                <span className="text-white text-sm w-16 text-center">{guests} {guests === 1 ? "Person" : "People"}</span>
                <button onClick={() => setGuests(g => g + 1)}
                  className="w-6 h-6 rounded-full bg-white/10 text-white hover:bg-white/20 transition text-sm flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 shrink-0">
            <Search size={18} /> Search
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-violet-400" : "w-2 bg-white/30"}`} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;
