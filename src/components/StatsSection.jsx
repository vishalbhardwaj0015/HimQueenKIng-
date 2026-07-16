import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Star, Award } from "lucide-react";

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Happy Travelers", color: "text-violet-400" },
  { icon: MapPin, value: 120, suffix: "+", label: "Destinations", color: "text-pink-400" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Avg Rating", color: "text-amber-400", decimal: true },
  { icon: Award, value: 15, suffix: "+", label: "Years of Excellence", color: "text-emerald-400" },
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
      className="flex flex-col items-center gap-3 p-8"
      initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay: index * 0.15, type: "spring" }}>
      <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center ${stat.color}`}>
        <Icon size={26} />
      </div>
      <span className={`font-display text-4xl font-bold ${stat.color}`}>{count}{stat.suffix}</span>
      <span className="text-white/60 text-sm font-medium">{stat.label}</span>
    </motion.div>
  );
};

const StatsSection = () => (
  <section className="py-16 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-pink-900/20" />
    <div className="max-w-5xl mx-auto relative">
      <div className="glass rounded-3xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
        {stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} />)}
      </div>
    </div>
  </section>
);

export default StatsSection;
