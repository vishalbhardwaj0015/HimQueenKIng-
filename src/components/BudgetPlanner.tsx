import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { budgetRanges } from "../data/travelData";
import type { BudgetLevel } from "../data/travelData";

const budgetOptions: { key: BudgetLevel; icon: string; desc: string }[] = [
  { key: "budget", icon: "🎒", desc: "Backpacker-friendly stays, shared transport, and the best of nature on a shoestring." },
  { key: "mid", icon: "🏖️", desc: "Comfortable hotels, private cabs, curated sightseeing — great value for money." },
  { key: "premium", icon: "✨", desc: "Premium resorts, exclusive experiences, and personalized attention throughout." },
  { key: "luxury", icon: "👑", desc: "5-star stays, private helicopter transfers, and bespoke luxury itineraries." },
];

const BudgetPlanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Budget Planner</span>
          <h2 className="section-title mt-2 mb-4">
            Where Does Your <span className="text-[#b8860b]">Budget Fit?</span>
          </h2>
          <p className="section-subtitle mx-auto">Pick your budget range and we'll show you the best tours that match — no surprises, no hidden costs.</p>
        </motion.div>

        {/* Budget Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {budgetOptions.map((opt) => {
            const r = budgetRanges[opt.key];
            return (
              <motion.button key={opt.key}
                onClick={() => navigate(`/tours?budget=${opt.key}`)}
                whileHover={{ y: -4 }}
                className="group text-left p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#b8860b] transition-all duration-300 dark:border-gray-700 dark:bg-[#1a1a2e] dark:hover:border-[#b8860b]">
                <span className="text-3xl mb-3 block">{opt.icon}</span>
                <div className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold text-white mb-3 ${r.color}`}>
                  {r.range}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100 group-hover:text-[#b8860b] transition-colors">{r.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{opt.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[#b8860b] text-sm font-semibold">
                  View Tours <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BudgetPlanner;
