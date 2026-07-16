import { motion } from "framer-motion";
import { Car, Shield, Map, Headphones, Camera, Compass, Mountain, Users, Plane } from "lucide-react";

const services = [
  { icon: Car, title: "Premium Transport", desc: "Well-maintained AC vehicles, SUVs, and luxury buses for comfortable hill travel with experienced local drivers.", color: "from-blue-500 to-blue-600" },
  { icon: Map, title: "Custom Itineraries", desc: "Personalized travel plans designed by our expert team based on your interests, budget, and travel dates.", color: "from-violet-500 to-violet-600" },
  { icon: Shield, title: "Travel Insurance", desc: "Comprehensive travel insurance covering medical emergencies, trip cancellations, and adventure activities.", color: "from-emerald-500 to-emerald-600" },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer support via phone, WhatsApp, and email throughout your entire journey.", color: "from-rose-500 to-rose-600" },
  { icon: Camera, title: "Photography Tours", desc: "Guided photography expeditions to capture the most stunning landscapes, sunrises, and cultural moments.", color: "from-amber-500 to-amber-600" },
  { icon: Mountain, title: "Adventure Activities", desc: "Rafting, paragliding, skiing, bungee, zip-lining — we arrange all thrill activities at the best prices.", color: "from-cyan-500 to-cyan-600" },
  { icon: Compass, title: "Expert Guides", desc: "Certified and experienced local guides who know every trail, temple, and hidden gem of the Himalayas.", color: "from-orange-500 to-orange-600" },
  { icon: Users, title: "Group Tours", desc: "Special group packages for corporate retreats, college trips, family reunions, and friend squads.", color: "from-pink-500 to-pink-600" },
  { icon: Plane, title: "Flight & Train Booking", desc: "Hassle-free booking for flights and trains to Delhi, Chandigarh, and other gateway cities.", color: "from-indigo-500 to-indigo-600" },
];

const whyUs = [
  { num: "15+", label: "Years Experience" },
  { num: "50K+", label: "Happy Travelers" },
  { num: "120+", label: "Destinations" },
  { num: "4.9", label: "Avg Rating" },
];

const Services = () => (
  <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950">
    {/* Hero */}
    <div className="relative h-64 sm:h-80 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=60')] bg-cover bg-center" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Our Services</h1>
        <p className="text-white/80 max-w-lg">Everything you need for a seamless Himalayan adventure, all under one roof</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      {/* Why Us Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {whyUs.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{s.num}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={26} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-10 sm:p-14 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">Let our travel experts craft the perfect Himalayan journey for you. Tell us your dream destination and we'll handle the rest.</p>
        <a href="/dream-destination" className="inline-flex px-8 py-3.5 rounded-xl bg-white text-orange-600 font-bold hover:shadow-2xl transition-all active:scale-[0.97]">
          Plan My Trip →
        </a>
      </div>
    </div>
  </div>
);

export default Services;
