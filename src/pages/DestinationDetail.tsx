import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle2, ArrowLeft, Tag } from "lucide-react";
import { destinations, budgetRanges } from "../data/travelData";
import EnquiryForm from "../components/EnquiryForm";

const DestinationDetail = () => {
  const { id } = useParams();
  const dest = destinations.find((d) => d.id === Number(id));

  if (!dest) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Destination not found</h1>
        <Link to="/destinations" className="text-[#b8860b] font-semibold hover:underline">← Back to Destinations</Link>
      </div>
    );
  }

  const budgetInfo = budgetRanges[dest.budget];

  return (
    <div className="pt-20 pb-20 min-h-screen bg-gray-50 dark:bg-[#0f0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/destinations" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#b8860b] font-medium mb-6 mt-4 transition">
          <ArrowLeft size={18} /> Back to Destinations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-72 sm:h-96">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-bold text-white ${dest.badgeBg}`}>{dest.badge}</span>
                <div className="absolute bottom-6 left-6">
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{dest.name}</h1>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin size={14} /> {dest.region}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span className="text-sm font-semibold">{dest.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({dest.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold text-white ${budgetInfo.color}`}>
                  <Tag size={13} /> {budgetInfo.range}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dest.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">{dest.desc}</p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Top Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-white mb-3 ${budgetInfo.color}`}>
                  <Tag size={14} /> {budgetInfo.range}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Budget Level</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{budgetInfo.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">We'll design a custom itinerary within your budget</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <EnquiryForm itemName={dest.name} itemType="Destination" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
