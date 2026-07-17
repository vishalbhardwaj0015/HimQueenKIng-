import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TrendingUp, Calendar, Search, MessageCircle, ChevronDown, ChevronUp, UtensilsCrossed, Tent, MapPin } from "lucide-react";

const allTreks = [
  {
    id: 1, title: "Kheerganga Trek", region: "Parvati Valley, HP", difficulty: "Easy", duration: "3D / 2N", altitude: "9,700 ft", bestTime: "Apr – Nov",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
    desc: "The most popular trek in Parvati Valley. Famous for its natural hot water springs at the top with stunning mountain views.",
    itinerary: [
      { day: "Day 1", title: "Kasol → Kheerganga Base Camp (Barshaini)", activities: ["Drive from Kasol to Barshaini (16 km)", "Start trek from Barshaini (12 km trek)", "Trek through pine forests & waterfalls", "Reach Kheerganga meadow camp"], meals: "Dinner", stay: "Tent" },
      { day: "Day 2", title: "Kheerganga – Hot Springs & Exploration", activities: ["Early morning natural hot water springs", "Sunrise views of Parvati Valley", "Explore meadows & forest trails", "Bonfire & stargazing at camp"], meals: "Breakfast & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Kheerganga → Barshaini → Kasol", activities: ["Morning trek down to Barshaini", "Drive back to Kasol", "Explore Kasol cafés", "Depart for Delhi"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "Alpine tents with sleeping bags & mattresses. Shared toilet tents. Bonfire arrangements at camp.",
    mealsInfo: "Day 1: Dinner only | Day 2: Breakfast & Dinner | Day 3: Breakfast only | Packed lunch can be arranged on request.",
  },
  {
    id: 2, title: "Chuddhar Trek", region: "Shimla, HP", difficulty: "Moderate", duration: "4D / 3N", altitude: "11,200 ft", bestTime: "Apr – Jun, Sep – Nov",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    desc: "A stunning ridge trek near Shimla offering panoramic views of snow-capped peaks including Kinnaur, Kullu, and Shimla ranges.",
    itinerary: [
      { day: "Day 1", title: "Shimla → Chuddhar Base (Narkanda)", activities: ["Drive from Shimla to Narkanda (60 km)", "Trek from Narkanda to Chuddhar camp (8 km)", "Pass through dense apple orchards & deodar forests"], meals: "Dinner", stay: "Tent" },
      { day: "Day 2", title: "Chuddhar Summit (11,200 ft)", activities: ["Early morning summit trek (4 km round trip)", "360° views of Kinnaur, Kullu & Shimla ranges", "Hanuman Temple at the top", "Return to camp for lunch", "Evening bonfire"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Chuddhar → Hatu Peak Trek", activities: ["Trek to Hatu Peak (3,400m)", "Panoramic Himalayan views", "Hatu Mata Temple", "Descend to Narkanda", "Overnight at Narkanda"], meals: "Breakfast & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 4", title: "Narkanda → Shimla", activities: ["Morning local sightseeing", "Drive back to Shimla (60 km)", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "Alpine dome tents with sleeping bags, mattresses & pillows. Dining tent with tables & chairs. Toilet tent at campsite.",
    mealsInfo: "All meals included at camp. Freshly cooked pahadi food – dal, rice, roti, sabzi, eggs, tea. Packed lunch for summit day.",
  },
  {
    id: 3, title: "Kinner Kailash Trek", region: "Kinnaur, HP", difficulty: "Challenging", duration: "6D / 5N", altitude: "16,500 ft", bestTime: "May – Oct",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80",
    desc: "One of the most sacred and challenging treks in Kinnaur. Takes you to the base of the mythical Kinner Kailash Shivling at 16,500 ft.",
    itinerary: [
      { day: "Day 1", title: "Shimla → Kalpa (250 km / 9–10 hrs)", activities: ["Drive to Kalpa via Kinnaur gate", "Pass through apple orchards", "Arrive Kalpa – views of Kinner Kailash"], meals: "Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 2", title: "Kalpa → Tangling (Trek Start)", activities: ["Drive to Tangling village (12 km)", "Start trek to base camp (10 km)", "Pass through oak & rhododendron forests"], meals: "Breakfast & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Tangling → Kinner Kailash Base", activities: ["Trek to high-altitude base (12 km)", "Steep ascent through moraines", "Reach base camp at 14,000 ft", "Views of Kinner Kailash Shivling"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 4", title: "Kinner Kailash Summit & Return", activities: ["Summit attempt to Shivling (16,500 ft)", "Sacred Shivling ice formation", "Panoramic views of Kinnaur & Tibet border", "Descend to base camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 5", title: "Base → Tangling → Kalpa", activities: ["Trek down to Tangling village", "Drive back to Kalpa", "Rest and recovery"], meals: "Breakfast & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 6", title: "Kalpa → Shimla", activities: ["Morning Kalpa sightseeing", "Drive back to Shimla", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "Expedition-grade 4-season tents for high altitude. Sleeping bags rated to -10°C. Toilet tent & kitchen tent included. Porter/mule for luggage.",
    mealsInfo: "All meals included – breakfast, lunch, dinner. High-energy packed meals for summit day. Hot drinks & soup available at camp.",
  },
  {
    id: 4, title: "Shrikhand Mahadev Trek", region: "Kullu, HP", difficulty: "Hard", duration: "5D / 4N", altitude: "17,192 ft", bestTime: "Jun – Oct",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    desc: "One of the toughest and most sacred treks in Himachal. Pilgrimage to the natural Shivling at Shrikhand Mahadev peak.",
    itinerary: [
      { day: "Day 1", title: "Manali → Bundla (Trek Base)", activities: ["Drive from Manali to Bundla (via Aut)", "Trek from Bundla to Parbati River camp (8 km)", "Camp setup at river bank"], meals: "Dinner", stay: "Tent" },
      { day: "Day 2", title: "Bundla → Thachru (8 km trek)", activities: ["Steep ascent through forest", "Cross Parbati River bridges", "Reach Thachru camp", "Acclimatization rest"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Thachru → Shrikhand Base (10 km trek)", activities: ["Trek to high-altitude meadows", "Pass through boulders & moraines", "Reach Shrikhand base camp (14,000 ft)", "Views of snow peaks"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 4", title: "Shrikhand Summit (17,192 ft) & Return", activities: ["Summit trek to Shrikhand Mahadev peak", "Natural Shivling ice formation at top", "Panoramic views of Kullu & Spiti", "Descend to Thachru camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 5", title: "Thachru → Bundla → Manali", activities: ["Trek down to Bundla", "Drive back to Manali", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "High-altitude expedition tents (4-season). Sleeping bags (-15°C rated). Mule/porter service for luggage. Medical kit & oxygen available.",
    mealsInfo: "All meals included – 3 meals + tea/snacks. Nutritious high-altitude meals. Packed lunch for summit day. Drinking water provided.",
  },
  {
    id: 5, title: "Hampta Pass Trek", region: "Manali, HP", difficulty: "Moderate", duration: "5D / 4N", altitude: "14,100 ft", bestTime: "Jun – Oct",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    desc: "One of the most dramatic crossover treks in Himachal. Traverses from lush green meadows of Kullu to the cold desert of Lahaul.",
    itinerary: [
      { day: "Day 1", title: "Manali → Jobra → Chika Camp", activities: ["Drive from Manali to Jobra (16 km)", "Trek to Chika camp (8 km)", "Trek through pine forests & meadows"], meals: "Lunch & Dinner", stay: "Tent" },
      { day: "Day 2", title: "Chika → Balu Ka Ghera (10 km)", activities: ["Trek along Hampta Nala river", "Cross bridges & waterfalls", "Reach Balu Ka Ghera meadow camp", "Stunning campsite surrounded by peaks"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Balu Ka Ghera → Hampta Pass → Chatru (12 km)", activities: ["Early morning ascent to Hampta Pass (14,100 ft)", "Dramatic landscape change – green to desert", "Descend to Chatru camp", "Views of Spiti Valley below"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 4", title: "Chatru → Chandratal Lake Excursion (40 km drive)", activities: ["Drive to Chandratal Lake (moon lake)", "Pristine blue lake at 14,000 ft", "Photography & nature walks", "Return to Chatru camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 5", title: "Chatru → Manali (Drive)", activities: ["Drive back to Manali via Gramphoo & Atal Tunnel", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "2-person dome tents with sleeping bags & mats. Dining tent with camping chairs. Porters carry camping equipment.",
    mealsInfo: "All meals included – fresh cooked camp food. Breakfast: parathas, eggs, tea. Lunch: rice, dal, vegetables. Dinner: soup, roti, curry.",
  },
  {
    id: 6, title: "Triund Ridge Trek", region: "Dharamshala, HP", difficulty: "Easy", duration: "2D / 1N", altitude: "9,350 ft", bestTime: "Mar – Dec",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=700&q=80",
    desc: "The crown jewel of Dharamshala with majestic panoramic views of the Dhauladhar range. Perfect beginner-friendly overnight trek.",
    itinerary: [
      { day: "Day 1", title: "McLeod Ganj → Triund Camp (10 km trek)", activities: ["Start from Galu Devi Temple", "Trek through rhododendron & oak forests", "Multiple tea stalls on the way", "Reach Triund ridge top", "Sunset over Dhauladhar range", "Overnight camping"], meals: "Dinner", stay: "Tent" },
      { day: "Day 2", title: "Triund → McLeod Ganj", activities: ["Sunrise at Triund ridge", "Breakfast with mountain views", "Trek back to McLeod Ganj", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "Camping tents available at Triund top (₹800-1200 per tent). Or bring your own tent. Basic toilet facilities. Bonfire available in season.",
    mealsInfo: "Day 1: Dinner at camp (dal, rice, roti). Day 2: Breakfast. Tea & Maggi available at Triund top stalls.",
  },
  {
    id: 7, title: "Prashar Lake Trek", region: "Mandi, HP", difficulty: "Easy", duration: "2D / 1N", altitude: "8,800 ft", bestTime: "Mar – Dec",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    desc: "A hidden gem near Mandi with a sacred floating island lake and ancient pagoda-style temple. Perfect overnight trek.",
    itinerary: [
      { day: "Day 1", title: "Mandi → Baggi Village → Prashar Lake (5 km trek)", activities: ["Drive from Mandi to Baggi village (25 km)", "Easy trek through pine forests (5 km)", "Reach Prashar Lake", "Visit ancient Prashar Temple", "Sunset at the lake", "Overnight camping"], meals: "Dinner", stay: "Tent" },
      { day: "Day 2", title: "Prashar Lake → Baggi → Mandi", activities: ["Morning at the lake – floating island view", "Breakfast at camp", "Trek back to Baggi", "Drive to Mandi", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "Camping tents on the lake meadow (₹600-1000 per tent). Basic washroom facilities. Bonfire arrangements available.",
    mealsInfo: "Day 1: Dinner (local pahadi food). Day 2: Breakfast. Basic meals – rice, dal, roti, eggs. Tea & snacks available nearby.",
  },
  {
    id: 8, title: "Beas Kund Trek", region: "Manali, HP", difficulty: "Easy", duration: "3D / 2N", altitude: "10,800 ft", bestTime: "May – Oct",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&q=80",
    desc: "A short glacier trek to the source of River Beas. Stunning views of Solang Valley and surrounding snow peaks.",
    itinerary: [
      { day: "Day 1", title: "Manali → Dhundi → Bakarthach Camp (8 km)", activities: ["Drive from Manali to Solang (16 km)", "Trek from Solang to Dhundi (4 km)", "Continue to Bakarthach campsite (4 km)", "Camp by Beas River"], meals: "Lunch & Dinner", stay: "Tent" },
      { day: "Day 2", title: "Bakarthach → Beas Kund → Bakarthach (10 km)", activities: ["Trek to Beas Kund glacier lake (5 km)", "Views of Seven Sisters waterfall", "Packed lunch at the lake", "Return to camp", "Bonfire night"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Bakarthach → Solang → Manali", activities: ["Trek back to Solang (8 km)", "Drive to Manali", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "Camping tents at Bakarthach meadow. Sleeping bags & mattresses provided. Dining tent included. Basic toilet tent.",
    mealsInfo: "All meals included at camp. Freshly cooked meals – parathas, eggs, rice, dal, soup. Hot beverages throughout the trek.",
  },
  {
    id: 9, title: "Kedarkantha Trek", region: "Uttarakhand", difficulty: "Moderate", duration: "6D / 5N", altitude: "12,500 ft", bestTime: "Dec – Apr, May – Jun",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=700&q=80",
    desc: "One of the best winter snow treks in Uttarakhand. A perfect summit trek for beginners with 360° Himalayan views.",
    itinerary: [
      { day: "Day 1", title: "Dehradun → Sankri (180 km / 7–8 hrs)", activities: ["Drive from Dehradun to Sankri village", "Pass through Mussoorie & Kempty Falls", "Arrive Sankri – trek base"], meals: "Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 2", title: "Sankri → Juda Ka Talab (Trek 4 km)", activities: ["Start trek from Sankri", "Trek through dense pine & oak forest", "Reach Juda Ka Talab (frozen lake)", "Camp near the lake"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Juda Ka Talab → Kedarkantha Base (Trek 5 km)", activities: ["Ascend through snow-covered forest", "Reach Kedarkantha base camp (11,250 ft)", "Panoramic views of Swargarohini & Bandarpoonch peaks"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 4", title: "Kedarkantha Summit (12,500 ft) → Base", activities: ["Early morning summit push (3 km)", "360° views of Yamunotri, Gangotri & Kedarnath peaks", "Summit at Kedarkantha (12,500 ft)", "Descend to base camp", "Farewell bonfire"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 5", title: "Base → Sankri (Trek 9 km)", activities: ["Trek down to Sankri", "Stop at local village", "Reach Sankri", "Rest"], meals: "Breakfast & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 6", title: "Sankri → Dehradun", activities: ["Drive back to Dehradun", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "3-season tents with sleeping bags (-10°C). Sleeping mats & pillows. Dining tent with camping chairs. Porters for camping gear.",
    mealsInfo: "All meals included – hot fresh meals at camp. Breakfast: poha, paratha, eggs, tea. Lunch: rice, dal, sabzi. Dinner: soup, roti, curry.",
  },
  {
    id: 10, title: "Valley of Flowers Trek", region: "Uttarakhand", difficulty: "Moderate", duration: "6D / 5N", altitude: "14,100 ft", bestTime: "Jul – Sep",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
    desc: "UNESCO World Heritage trek through a stunning meadow of hundreds of species of wildflowers. Best monsoon trek in India.",
    itinerary: [
      { day: "Day 1", title: "Haridwar → Govindghat (290 km / 10–11 hrs)", activities: ["Drive from Haridwar through Joshimath", "Arrive Govindghat – trek starting point"], meals: "Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 2", title: "Govindghat → Ghangaria (13 km trek)", activities: ["Trek from Govindghat through Alaknanda River valley", "Pass through villages & waterfalls", "Reach Ghangaria camp town"], meals: "Breakfast, Lunch & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 3", title: "Ghangaria → Valley of Flowers → Ghangaria (11 km)", activities: ["Trek into Valley of Flowers (UNESCO site)", "Hundreds of wildflower species in bloom", "Himalayan poppies, orchids, primulas", "Pack lunch inside the valley", "Return to Ghangaria"], meals: "Breakfast, Packed Lunch & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 4", title: "Hemkund Sahib Excursion (10 km round trip)", activities: ["Trek to Hemkund Sahib (14,100 ft)", "Sacred Sikh Gurudwara & glacial lake", "Lunch at Gurudwara langar", "Return to Ghangaria"], meals: "Breakfast & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 5", title: "Ghangaria → Govindghat (13 km) → Joshimath", activities: ["Trek back to Govindghat", "Drive to Joshimath", "Rest"], meals: "Breakfast & Dinner", stay: "Hotel" },
      { day: "Day 6", title: "Joshimath → Haridwar → Delhi", activities: ["Drive to Haridwar", "Connect to Delhi"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "No camping inside the valley. Accommodation in Ghangaria guesthouses/dorms. Basic rooms with shared bathrooms. Advance booking recommended.",
    mealsInfo: "All meals at Ghangaria – dal, rice, roti, eggs, tea. Basic restaurant food. Carry energy bars for valley trek.",
  },
  {
    id: 11, title: "Brahmatal Trek", region: "Uttarakhand", difficulty: "Moderate", duration: "6D / 5N", altitude: "12,250 ft", bestTime: "Jan – Mar, May – Jun",
    image: "https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=700&q=80",
    desc: "A winter wonderland trek with frozen lakes and stunning views of Trishul and Nanda Ghunti peaks. Best winter trek.",
    itinerary: [
      { day: "Day 1", title: "Dehradun → Lohajung (230 km / 8–9 hrs)", activities: ["Drive from Dehradun to Lohajung", "Drive through Kausani valley", "Arrive Lohajung – trek base"], meals: "Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 2", title: "Lohajung → Didna Village (5 km trek)", activities: ["Trek through oak & rhododendron forests", "Cross Pindar River", "Reach Didna village camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Didna → Bedni Bugyal (10 km trek)", activities: ["Ascend to Bedni Bugyal meadow", "Stunning alpine meadow at 11,500 ft", "Views of Trishul & Nanda Ghunti peaks", "Camp in the meadows"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 4", title: "Bedni Bugyal → Brahmatal → Patalkot (10 km)", activities: ["Trek to Brahmatal Lake (frozen in winter)", "Sacred lake with mythological significance", "Continue to Patalkot camp", "Sunset views"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 5", title: "Patalkot → Lohajung (8 km trek)", activities: ["Trek back to Lohajung", "Descend through forests", "Reach Lohajung"], meals: "Breakfast & Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 6", title: "Lohajung → Dehradun", activities: ["Drive back to Dehradun", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "3-season tents with cold-weather sleeping bags. Sleeping mats & pillow. Dining tent. Porter service for camping equipment.",
    mealsInfo: "All meals included – hot fresh camp food. 3 meals per day. Energy snacks & tea on trek. Packed lunch for long trek days.",
  },
  {
    id: 12, title: "Har Ki Dun Trek", region: "Uttarakhand", difficulty: "Moderate", duration: "7D / 6N", altitude: "11,700 ft", bestTime: "Apr – Jun, Sep – Nov",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    desc: "The Valley of Gods – a beautiful cradle-shaped valley at the foot of Swargarohini peak. Ancient villages & glaciers.",
    itinerary: [
      { day: "Day 1", title: "Dehradun → Mussoorie → Sankri (180 km / 7–8 hrs)", activities: ["Drive to Sankri via Mussoorie", "Arrive Sankri village", "Evening village walk"], meals: "Dinner", stay: "Hotel/Guesthouse" },
      { day: "Day 2", title: "Sankri → Taluka (Trek 10 km)", activities: ["Trek from Sankri to Taluka village", "Pass through pine & oak forests", "Cross Supin River", "Reach Taluka village camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 3", title: "Taluka → Osla Village (Trek 8 km)", activities: ["Trek to ancient Osla village", "See traditional Himalayan architecture", "Meet local villagers", "Camp near the village"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 4", title: "Osla → Har Ki Dun Valley (Trek 10 km)", activities: ["Trek into Har Ki Dun valley", "Views of Swargarohini & Kalanag peaks", "Moraine & glacier walking", "Camp in the valley"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 5", title: "Har Ki Dun – Exploration Day", activities: ["Explore the valley & Ruinsara Lake", "Glacier walking", "Photography & bird watching", "Bonfire at camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 6", title: "Har Ki Dun → Taluka (Trek 18 km)", activities: ["Long trek back to Taluka", "Descent through forests", "Reach Taluka camp"], meals: "Breakfast, Lunch & Dinner", stay: "Tent" },
      { day: "Day 7", title: "Taluka → Sankri → Dehradun", activities: ["Trek to Sankri (10 km)", "Drive to Dehradun", "Tour ends"], meals: "Breakfast", stay: "-" },
    ],
    tentInfo: "3-season expedition tents. Sleeping bags (-5°C rated). Sleeping mats. Dining tent with chairs. Porters for all camping gear.",
    mealsInfo: "All meals included – 3 meals per day + tea/snacks. Camp-cooked fresh food. Local pahadi cuisine. Packed lunch for long days.",
  },
];

const difficulties = ["All", "Easy", "Moderate", "Challenging", "Hard"];
const regions = ["All", "HP", "UK"];
const diffColor = { Easy: "text-green-600 bg-green-50", Moderate: "text-amber-600 bg-amber-50", Challenging: "text-orange-600 bg-orange-50", Hard: "text-red-600 bg-red-50" };

const Treks = () => {
  const [diffFilter, setDiffFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = allTreks.filter((t) => {
    const matchDiff = diffFilter === "All" || t.difficulty === diffFilter;
    const matchRegion = regionFilter === "All" || (regionFilter === "HP" && t.region.includes("HP")) || (regionFilter === "UK" && t.region.includes("UK"));
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.region.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchRegion && matchSearch;
  });

  const handleEnquire = (trek) => {
    const msg = `Hi! I'm interested in the ${trek.title} trek (${trek.difficulty}, ${trek.duration}). Can you share details about budget, meals, and tent/accommodation?`;
    window.open(`https://wa.me/919805556015?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#faf9f6] dark:bg-[#0f0f1a]">
      <div className="relative h-64 sm:h-80 bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=60')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display">Trek Adventures</h1>
          <p className="text-gray-300 max-w-lg">Himachal Pradesh & Uttarakhand treks with meals, tents & complete details</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-6 border border-gray-100 dark:border-gray-700">
          <Search size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
          <input type="text" placeholder="Search treks by name or region..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {regions.map((r) => (
            <button key={r} onClick={() => setRegionFilter(r)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              regionFilter === r ? "bg-[#b8860b] text-white border-[#b8860b]" : "bg-white dark:bg-[#1a1a2e] text-gray-600 dark:text-gray-400 hover:border-[#b8860b] hover:text-[#b8860b] border-gray-200 dark:border-gray-700"
            }`}>
              {r === "All" ? "All Regions" : r === "HP" ? "Himachal Pradesh" : "Uttarakhand"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map((d) => (
            <button key={d} onClick={() => setDiffFilter(d)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              diffFilter === d ? "bg-[#1a1a2e] text-white border-[#1a1a2e]" : "bg-white dark:bg-[#1a1a2e] text-gray-600 dark:text-gray-400 hover:border-[#1a1a2e] hover:text-[#1a1a2e] border-gray-200 dark:border-gray-700"
            }`}>
              {d}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((trek, i) => {
            const isOpen = expanded === trek.id;
            return (
              <motion.div key={trek.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                    <img src={trek.image} alt={trek.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${diffColor[trek.difficulty]}`}>{trek.difficulty}</span>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <MapPin size={11} /> {trek.region}
                    </div>
                  </div>
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl">{trek.title}</h3>
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full shrink-0 ml-2">{trek.altitude}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Clock size={12} /> {trek.duration}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} /> {trek.altitude}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {trek.bestTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{trek.desc}</p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1.5 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                        <UtensilsCrossed size={12} /> Meals Included
                      </div>
                      <div className="flex items-center gap-1.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                        <Tent size={12} /> {trek.tentInfo.split('.')[0]}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEnquire(trek)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BD5A] transition-all">
                        <MessageCircle size={14} /> Enquire on WhatsApp
                      </button>
                      <button onClick={() => setExpanded(isOpen ? null : trek.id)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-semibold hover:border-[#b8860b] hover:text-[#b8860b] transition-all">
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {isOpen ? "Hide Details" : "Full Itinerary & Meals"}
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="border-t border-gray-100 dark:border-gray-700 p-5 md:p-6 space-y-6">
                        {/* Day-by-day itinerary */}
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-4">Day-by-Day Itinerary</h4>
                          <div className="space-y-3">
                            {trek.itinerary.map((day, j) => (
                              <div key={j} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="w-9 h-9 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                    {day.day.replace("Day ", "")}
                                  </div>
                                  {j < trek.itinerary.length - 1 && <div className="w-0.5 flex-1 bg-[#b8860b]/20 mt-1" />}
                                </div>
                                <div className="pb-3 flex-1">
                                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                                    <h5 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{day.title}</h5>
                                    <ul className="mt-2 space-y-1">
                                      {day.activities.map((act, k) => (
                                          <li key={k} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />{act}
                                        </li>
                                      ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      <span className="text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full font-medium">🍽 {day.meals}</span>
                                      {day.stay && day.stay !== "-" && (
                                        <span className="text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full font-medium">🛏 {day.stay}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Meals Info */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2"><UtensilsCrossed size={16} className="text-amber-600" /> Meals Information</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{trek.mealsInfo}</p>
                        </div>

                        {/* Tent/Stay Info */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2"><Tent size={16} className="text-blue-600" /> Tent & Accommodation</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{trek.tentInfo}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <p className="text-lg font-medium">No treks match your filters</p>
            <p className="text-sm">Try adjusting your region or difficulty filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Treks;
