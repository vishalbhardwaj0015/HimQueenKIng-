import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { tours, budgetRanges } from "../data/travelData";

const packages = tours.slice(0, 3);

const TourPackageCard = ({ pkg, index }) => (
  <motion.article className="card flex flex-col"
    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay: index * 0.12, duration: 0.6 }}>
    <Link to={`/tours/${pkg.id}`}>
      <div className="relative h-56 overflow-hidden">
        <img src={pkg.image} alt={pkg.title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 left-3 bg-[#b8860b] text-white text-xs font-semibold px-3 py-1 rounded-full">{pkg.badge}</span>
        <span className={`absolute top-3 right-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${budgetRanges[pkg.budget].color}`}>
          {budgetRanges[pkg.budget].label}
        </span>
      </div>
    </Link>

    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-bold text-gray-900 text-lg mb-2 hover:text-[#b8860b] transition-colors">
        <Link to={`/tours/${pkg.id}`}>{pkg.title}</Link>
      </h3>
      <div className="flex flex-wrap gap-3 text-gray-400 text-xs mb-3">
        <span className="flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
        <span className="flex items-center gap-1"><Users size={12} /> {pkg.group}</span>
        <span className="flex items-center gap-1"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {pkg.rating} ({pkg.reviews})</span>
      </div>

      <ul className="space-y-1.5 mb-4">
        {pkg.highlights.slice(0, 3).map(h => (
          <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" /> {h}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin size={11} /> {pkg.destination}
        </div>
        <Link to={`/tours/${pkg.id}`} className="btn-primary text-sm !py-2.5 !px-5">
          View Details <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </motion.article>
);

const TourPackagesSection = () => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <span className="section-label">Curated Packages</span>
        <h2 className="section-title mt-2 mb-4">
          Our <span className="text-[#b8860b]">Best Packages</span>
        </h2>
        <p className="section-subtitle mx-auto">All-inclusive travel packages for the ultimate Himalayan experience</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, i) => <TourPackageCard key={pkg.id} pkg={pkg} index={i} />)}
      </div>
      <div className="text-center mt-10">
        <Link to="/tours" className="btn-outline">
          View All Tours <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default TourPackagesSection;
