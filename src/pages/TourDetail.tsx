import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, MapPin, Mountain, ArrowLeft, Calendar } from "lucide-react";
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
          <div className="lg:col-span-2 space-y-8">
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 px-4 py-2 rounded-full">
                  <Clock size={14} /> {tour.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 px-4 py-2 rounded-full">
                  <Users size={14} /> Group: {tour.group}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 px-4 py-2 rounded-full">
                  <Mountain size={14} /> {tour.difficulty}
                </div>
                <div className="flex items-center gap-1 text-sm bg-amber-50 px-4 py-2 rounded-full">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" /> {tour.rating} ({tour.reviews} reviews)
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mb-3">What's Included</h2>
              <div className="flex flex-wrap gap-2">
                {tour.includes.map((inc) => (
                  <span key={inc} className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium">{inc}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold shrink-0">
                        <Calendar size={14} />
                      </div>
                      {i < tour.itinerary.length - 1 && <div className="w-0.5 flex-1 bg-orange-200 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-bold text-gray-900">{day.day}: {day.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-orange-600">₹{tour.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">₹{tour.originalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-green-600 font-medium mt-1">Save ₹{(tour.originalPrice - tour.price).toLocaleString()} ({Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}% OFF)</p>
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
