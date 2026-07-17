import { motion } from "framer-motion";
import { Car, Shield, Map, Headphones, Camera, Compass, Mountain, Users, Plane } from "lucide-react";

const services = [
  { icon: Car, title: "Premium Transport", desc: "Well-maintained AC vehicles, SUVs, and luxury buses for comfortable hill travel with experienced local drivers.", color: "#1a1a2e" },
  { icon: Map, title: "Custom Itineraries", desc: "Personalized travel plans designed by our expert team based on your interests, budget, and travel dates.", color: "#b8860b" },
  { icon: Shield, title: "Travel Insurance", desc: "Comprehensive travel insurance covering medical emergencies, trip cancellations, and adventure activities.", color: "#2d6a4f" },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer support via phone, WhatsApp, and email throughout your entire journey.", color: "#c44569" },
  { icon: Camera, title: "Photography Tours", desc: "Guided photography expeditions to capture the most stunning landscapes, sunrises, and cultural moments.", color: "#b8860b" },
  { icon: Mountain, title: "Adventure Activities", desc: "Rafting, paragliding, skiing, bungee, zip-lining — we arrange all thrill activities at the best prices.", color: "#1a1a2e" },
  { icon: Compass, title: "Expert Guides", desc: "Certified and experienced local guides who know every trail, temple, and hidden gem of the Himalayas.", color: "#b8860b" },
  { icon: Users, title: "Group Tours", desc: "Special group packages for corporate retreats, college trips, family reunions, and friend squads.", color: "#2d6a4f" },
  { icon: Plane, title: "Flight & Train Booking", desc: "Hassle-free booking for flights and trains to Delhi, Chandigarh, and other gateway cities.", color: "#1a1a2e" },
];

const whyUs = [
  { num: "15+", label: "Years Experience" },
  { num: "12K+", label: "Happy Travelers" },
  { num: "50+", label: "Destinations" },
  { num: "4.9", label: "Avg Rating" },
];

const Services = () => (
  <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6]">
    <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=60')] bg-cover bg-center" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Our Services</h1>
        <p className="text-gray-300 max-w-lg">Everything you need for a seamless Himalayan adventure</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-gray-100">
        {whyUs.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-[#b8860b]">{s.num}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${s.color}10` }}>
                <Icon size={24} style={{ color: s.color }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 bg-[#1a1a2e] rounded-3xl p-10 sm:p-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">Ready for Your Next Adventure?</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">Let our travel experts craft the perfect Himalayan journey for you.</p>
        <a href="/dream-destination" className="inline-flex px-8 py-3.5 rounded-xl bg-[#b8860b] text-white font-bold hover:bg-[#996f08] transition-all">
          Plan My Trip →
        </a>
      </div>
    </div>
  </div>
);

export default Services;
