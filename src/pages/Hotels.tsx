import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Search } from "lucide-react";

const allHotels = [
  { id: 1, name: "HimQueen Estate & Resort", location: "Shimla", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", rating: 4.9, reviews: 420, price: 8999, desc: "Nestled in the lush hills of Shimla, this heritage property offers luxury suites, personal fireplaces, and majestic Himalayan views.", amenities: ["Heated Pool", "Spa", "Fine Dining", "Free WiFi", "Fireplace"], badge: "Luxury", badgeColor: "bg-amber-500" },
  { id: 2, name: "The Grand Solitude Lodge", location: "Manali", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=80", rating: 4.8, reviews: 380, price: 7499, desc: "Perched overlooking Solang Valley, this modern sanctuary blends alpine style with peak luxury. Features outdoor jacuzzi.", amenities: ["Jacuzzi", "Mountain View", "Bar", "Gym", "Room Service"], badge: "Premium", badgeColor: "bg-violet-500" },
  { id: 3, name: "Dharamshala Retreat & Spa", location: "Dharamshala", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80", rating: 4.7, reviews: 290, price: 6499, desc: "A calm, spiritual luxury retreat surrounded by deodar forests in McLeod Ganj. Features yoga studios and ayurvedic spa.", amenities: ["Yoga Studio", "Ayurvedic Spa", "Organic Café", "Library", "Garden"], badge: "Wellness", badgeColor: "bg-emerald-500" },
  { id: 4, name: "Snow Peak Mountain Camp", location: "Spiti Valley", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=700&q=80", rating: 4.6, reviews: 180, price: 4999, desc: "An exclusive high-altitude glamping experience in the heart of Spiti with panoramic mountain views and stargazing decks.", amenities: ["Glamping", "Bonfire", "Stargazing", "Local Cuisine", "Trek Guide"], badge: "Unique", badgeColor: "bg-cyan-500" },
  { id: 5, name: "Riverside Heritage Hotel", location: "Rishikesh", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80", rating: 4.8, reviews: 520, price: 5999, desc: "A charming riverside hotel blending modern comfort with traditional Indian hospitality along the banks of the Ganges.", amenities: ["River View", "Yoga Deck", "Restaurant", "Free WiFi", "Parking"], badge: "Riverside", badgeColor: "bg-blue-500" },
  { id: 6, name: "The Chopta Meadow Resort", location: "Chopta", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&q=80", rating: 4.5, reviews: 150, price: 3999, desc: "A cozy eco-resort nestled in the meadows of Chopta, offering stunning views of snow-capped peaks and serene nature walks.", amenities: ["Eco-Friendly", "Trek Info", "Campfire", "Home-cooked Meals", "Garden"], badge: "Eco", badgeColor: "bg-lime-500" },
];

const Hotels = () => {
  const [search, setSearch] = useState("");

  const filtered = allHotels.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Our Hotels & Stays</h1>
          <p className="text-white/80 max-w-lg">Handpicked accommodations for the ultimate Himalayan experience</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8">
          <Search size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
          <input type="text" placeholder="Search hotels by name or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((hotel, i) => (
            <motion.div key={hotel.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-56 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold text-white ${hotel.badgeColor}`}>{hotel.badge}</span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs">
                  <MapPin size={12} /> {hotel.location}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{hotel.rating}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">({hotel.reviews} reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{hotel.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{hotel.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {hotel.amenities.map((a) => (
                    <span key={a} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] font-medium">{a}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">Starting from</span>
                    <p className="text-2xl font-black text-rose-600">₹{hotel.price.toLocaleString()}<span className="text-xs font-normal text-gray-400 dark:text-gray-500">/night</span></p>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all active:scale-[0.97]">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
