import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Star, Shield } from "lucide-react";

const stats = [
  { icon: Users, value: 12000, suffix: "+", label: "Happy Travelers", color: "#b8860b" },
  { icon: MapPin, value: 50, suffix: "+", label: "Destinations", color: "#2d6a4f" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Avg Rating", color: "#c8860b", decimal: true },
  { icon: Shield, value: 15, suffix: " yrs", label: "Experience", color: "#1a1a2e" },
];

const StatItem = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let s = 0;
    const inc = stat.value / 120;
    const t = setInterval(() => {
      s += inc;
      if (s >= stat.value) { setCount(stat.value); clearInterval(t); }
      else setCount(stat.decimal ? parseFloat(s.toFixed(1)) : Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [started, stat.value, stat.decimal]);

  return (
    <motion.div ref={ref}
      className="flex flex-col items-center gap-3 p-6 sm:p-8"
      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
        <Icon size={22} style={{ color: stat.color }} />
      </div>
      <span className="font-display text-3xl sm:text-4xl font-bold" style={{ color: stat.color }}>
        {count}{stat.suffix}
      </span>
      <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
    </motion.div>
  );
};

const StatsSection = () => (
  <section className="py-12 px-4 bg-[#f5f0e8]">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200">
        {stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} />)}
      </div>
    </div>
  </section>
);

export default StatsSection;
