import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, XCircle, MapPin, Mountain, ArrowLeft, Calendar, Route } from "lucide-react";
import { tours } from "../data/travelData";
import EnquiryForm from "../components/EnquiryForm";

const TourDetail = () => {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === Number(id));

  if (!tour) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour not found</h1>
        <Link to="/tours" className="text-orange-600 font-semibold hover:underline">← Back to Tours</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/tours" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium mb-6 mt-4 transition">
          <ArrowLeft size={18} /> Back to Tours
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-72 sm:h-96">
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-bold text-white bg-gradient-to-r ${tour.color}`}>{tour.badge}</span>
                <div className="absolute bottom-6 left-6">
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{tour.title}</h1>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin size={14} /> {tour.destination}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tour Info Tags */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 px-4 py-2 rounded-full font-medium">
                  <Clock size={14} /> {tour.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 px-4 py-2 rounded-full font-medium">
                  <Users size={14} /> Group: {tour.group}
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 px-4 py-2 rounded-full font-medium">
                  <Mountain size={14} /> {tour.difficulty}
                </div>
                <div className="flex items-center gap-1 text-sm bg-amber-50 px-4 py-2 rounded-full font-medium">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" /> {tour.rating} ({tour.reviews} reviews)
                </div>
              </div>
            </motion.div>

            {/* Route */}
            {tour.route && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Route size={20} className="text-orange-500" /> Route
                </h2>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm sm:text-base text-gray-800 font-semibold">{tour.route}</p>
                </div>
              </motion.div>
            )}

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Main Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Day-by-Day Itinerary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {day.day.replace("Day ", "")}
                      </div>
                      {i < tour.itinerary.length - 1 && <div className="w-0.5 flex-1 bg-orange-200 mt-2" />}
                    </div>
                    <div className="pb-5 flex-1">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{day.title}</h3>
                        <ul className="mt-2 space-y-1">
                          {day.activities.map((act, j) => (
                            <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                              {act}
                            </li>
                          ))}
                        </ul>
                        {day.meals && (
                          <p className="mt-2 text-xs text-green-700 bg-green-50 inline-block px-2 py-1 rounded-full font-medium">🍽 {day.meals}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Package Includes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Package Includes</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tour.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" /> {inc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Package Excludes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Package Excludes</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tour.excludes.map((exc) => (
                  <li key={exc} className="flex items-start gap-2 text-sm text-gray-700">
                    <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" /> {exc}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-orange-600">₹{tour.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">₹{tour.originalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-green-600 font-medium mt-1">Save ₹{(tour.originalPrice - tour.price).toLocaleString()} ({Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}% OFF)</p>
                <p className="text-xs text-gray-400 mt-2">per person on twin sharing</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <EnquiryForm itemName={tour.title} itemType="Tour Package" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
