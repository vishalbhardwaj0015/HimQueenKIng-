import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Explore the", highlight: "Himalayas",
    subtitle: "Handcrafted journeys through India's most breathtaking mountain landscapes",
    tag: "Mountain Escapes",
  },
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
    title: "Discover Hidden", highlight: "Valleys",
    subtitle: "Pristine trails, ancient monasteries, and untouched beauty await",
    tag: "Valley Tours",
  },
  {
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80",
    title: "Adventure", highlight: "Awaits",
    subtitle: "From snow-capped peaks to turquoise lakes — your journey starts here",
    tag: "Adventure Tours",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      navigate(`/tours?search=${encodeURIComponent(destination.trim())}`);
    } else {
      navigate("/tours");
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          <motion.div key={current + "t"} initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }} className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-1.5 rounded-full font-medium">
              <MapPin size={13} /> {slide.tag}
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1]">
              {slide.title}{" "}
              <span className="text-[#f0c75e]">{slide.highlight}</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl font-light">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Search */}
        <motion.form onSubmit={handleSearch} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 flex items-center gap-2 w-full max-w-2xl shadow-xl">
          <div className="flex items-center gap-3 flex-1 px-4 py-3">
            <MapPin size={18} className="text-[#b8860b] shrink-0" />
            <div className="flex flex-col min-w-0">
              <label className="text-gray-400 text-xs font-medium">Destination</label>
              <input
                className="bg-transparent text-gray-900 text-sm outline-none placeholder:text-gray-400 w-full"
                placeholder="Manali, Ladakh, Spiti..."
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="bg-[#b8860b] hover:bg-[#996f08] text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all duration-300 shrink-0 text-sm">
            <Search size={16} /> Explore Tours
          </button>
        </motion.form>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-[#b8860b]" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      </div>

      {/* Scroll */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;
