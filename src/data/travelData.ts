export const tours = [
  { id: 1, title: "Manali Snow Adventure", destination: "Manali, HP", duration: "6D / 5N", group: "2–12", difficulty: "Moderate" as const, rating: 4.9, reviews: 312, originalPrice: 18999, price: 14999, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&q=80", highlights: ["Solang Valley Snow Activities", "Rohtang Pass Excursion", "Old Manali Café Tour", "Hadimba Temple Visit"], includes: ["Hotel", "Meals", "Transport", "Guide"], badge: "Most Booked", color: "from-indigo-500 to-indigo-600",
    itinerary: [
      { day: "Day 1", title: "Arrival in Manali", desc: "Arrive at Manali, check-in at hotel. Evening free to explore Mall Road and enjoy local street food. Overnight stay at hotel." },
      { day: "Day 2", title: "Solang Valley Adventure", desc: "Full day excursion to Solang Valley. Enjoy snow activities, paragliding, zorbing. Return to hotel by evening. Dinner & overnight." },
      { day: "Day 3", title: "Rohtang Pass Excursion", desc: "Full day trip to Rohtang Pass (subject to permit). Enjoy breathtaking views of snow-capped peaks, glaciers. Packed lunch included." },
      { day: "Day 4", title: "Old Manali & Hadimba Temple", desc: "Visit Hadimba Temple, Manu Temple. Explore Old Manali's charming cafés and shops. Evening at leisure." },
      { day: "Day 5", title: "Kullu & Manikaran", desc: "Day trip to Kullu Valley and Manikaran Sahib. Enjoy river rafting on the way (optional). Return to hotel." },
      { day: "Day 6", title: "Departure", desc: "After breakfast, check-out and transfer to Manali bus stand/airport. Tour ends with beautiful memories." },
    ]
  },
  { id: 2, title: "Spiti Valley Expedition", destination: "Spiti, HP", duration: "9D / 8N", group: "4–16", difficulty: "Challenging" as const, rating: 4.8, reviews: 189, originalPrice: 28999, price: 22999, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80", highlights: ["Key Monastery Visit", "Chandratal Lake Trek", "Kaza Village", "Fossil Trail"], includes: ["Homestay", "Meals", "4WD Jeep", "Guide"], badge: "Adventure", color: "from-violet-500 to-violet-600",
    itinerary: [
      { day: "Day 1", title: "Manali to Chitkul", desc: "Early morning departure. Drive through Atal Tunnel, reach Chitkul - the last village on India-China border. Overnight in homestay." },
      { day: "Day 2", title: "Chitkul to Nako", desc: "Scenic drive to Nako village. Visit Nako Monastery and the beautiful Nako Lake. Stay in homestay." },
      { day: "Day 3", title: "Nako to Tabo", desc: "Drive to Tabo. Explore 1000-year-old Tabo Monastery, a UNESCO heritage site. Overnight in Tabo." },
      { day: "Day 4", title: "Tabo to Kaza", desc: "Drive to Kaza via Dhankar Monastery. Visit Dhankar Fort with stunning Spiti valley views. Check-in at Kaza." },
      { day: "Day 5", title: "Kaza Local - Key & Kibber", desc: "Visit Key Monastery - the largest in Spiti. Continue to Kibber village. Explore fossil trails. Return to Kaza." },
      { day: "Day 6", title: "Chandratal Lake", desc: "Full day excursion to Chandratal Lake - the Moon Lake. Enjoy the pristine beauty. Overnight camping near the lake." },
      { day: "Day 7", title: "Chandratal to Manali", desc: "Early morning departure. Cross Kunzum Pass (4590m). Drive back to Manali via Atal Tunnel." },
      { day: "Day 8", title: "Manali - Rest Day", desc: "Free day in Manali. Explore local markets, cafes. Optional activities like paragliding." },
      { day: "Day 9", title: "Departure", desc: "After breakfast, transfer to Manali bus stand. Tour ends." },
    ]
  },
  { id: 3, title: "Leh Ladakh Royal Ride", destination: "Ladakh, J&K", duration: "10D / 9N", group: "6–20", difficulty: "Hard" as const, rating: 4.9, reviews: 540, originalPrice: 34999, price: 26999, image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=700&q=80", highlights: ["Pangong Lake Sunrise", "Khardung La Pass", "Nubra Valley Safari", "Magnetic Hill"], includes: ["Resort", "Meals", "Bike/SUV", "Permits"], badge: "Premium", color: "from-pink-500 to-pink-600",
    itinerary: [
      { day: "Day 1", title: "Arrive in Leh", desc: "Arrive at Leh airport. Acclimatize to high altitude. Rest and hydrate. Light evening walk near Leh Market." },
      { day: "Day 2", title: "Leh Local Sightseeing", desc: "Visit Shanti Stupa, Leh Palace, Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib. Return to hotel." },
      { day: "Day 3", title: "Leh to Nubra Valley", desc: "Drive over Khardung La (5359m) - world's highest motorable road. Reach Nubra Valley. Visit Diskit Monastery. Overnight in camp." },
      { day: "Day 4", title: "Nubra to Pangong Lake", desc: "Drive to Pangong Lake via Shyok route. Witness the magical color-changing lake. Overnight in camp." },
      { day: "Day 5", title: "Pangong Lake Exploration", desc: "Sunrise at Pangong. Explore the lake's beauty. Drive back to Leh. Overnight at hotel." },
      { day: "Day 6", title: "Leh to Sham Valley", desc: "Drive to Sham Valley. Visit Alchi Monastery, Gurudwara, confluence of Zanskar and Indus rivers." },
      { day: "Day 7", title: "Hemis & Thiksey Monastery", desc: "Visit Hemis Monastery (largest in Ladakh) and Thiksey Monastery (Mini Potala). Return to Leh." },
      { day: "Day 8", title: "Tso Moriri Lake", desc: "Full day trip to Tso Moriri Lake. One of the most beautiful high-altitude lakes. Return to Leh." },
      { day: "Day 9", title: "Free Day in Leh", desc: "Free day for shopping, local exploration, or optional adventure activities." },
      { day: "Day 10", title: "Departure", desc: "Transfer to Leh airport. Tour ends." },
    ]
  },
  { id: 4, title: "Kasol Backpacking Trip", destination: "Kasol, HP", duration: "4D / 3N", group: "2–8", difficulty: "Easy" as const, rating: 4.7, reviews: 890, originalPrice: 8999, price: 6499, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", highlights: ["Kheerganga Trek", "Manikaran Sahib", "Riverside Camping", "Café Hopping"], includes: ["Hostel", "Breakfast", "Transport", "Guide"], badge: "Budget", color: "from-emerald-500 to-emerald-600",
    itinerary: [
      { day: "Day 1", title: "Arrive in Kasol", desc: "Arrive at Kasol. Check-in at hostel/camp. Explore Kasol Market, riverside cafes. Bonfire night." },
      { day: "Day 2", title: "Kheerganga Trek", desc: "Full day Kheerganga Trek (12km). Natural hot water springs at the top. Trek back and overnight stay." },
      { day: "Day 3", title: "Manikaran & Tosh Village", desc: "Visit Manikaran Sahib (hot springs & Gurudwara). Afternoon trek to Tosh village. Evening return." },
      { day: "Day 4", title: "Departure", desc: "Morning free for café hopping. Check-out and transfer to Kasol bus stand. Tour ends." },
    ]
  },
  { id: 5, title: "Shimla Manali Grand Tour", destination: "Shimla & Manali", duration: "7D / 6N", group: "2–15", difficulty: "Easy" as const, rating: 4.8, reviews: 1200, originalPrice: 22999, price: 18999, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=700&q=80", highlights: ["Mall Road Shimla", "Kufri Snow Point", "Solang Valley", "Old Manali"], includes: ["Hotel", "All Meals", "AC Bus", "Guide"], badge: "Best Value", color: "from-amber-500 to-amber-600",
    itinerary: [
      { day: "Day 1", title: "Delhi to Shimla", desc: "Overnight Volvo bus from Delhi to Shimla. Morning arrival." },
      { day: "Day 2", title: "Shimla Local", desc: "Visit Mall Road, Ridge, Christ Church, Jakhoo Temple. Enjoy toy train ride. Overnight in Shimla." },
      { day: "Day 3", title: "Kufri & Naldehra", desc: "Full day trip to Kufri Snow Point and Naldehra. Enjoy horse riding, snow activities." },
      { day: "Day 4", title: "Shimla to Manali", desc: "Drive to Manali (4hrs). Evening free to explore Old Manali cafes." },
      { day: "Day 5", title: "Solang Valley", desc: "Full day at Solang Valley. Adventure activities, snow sports. Return to hotel." },
      { day: "Day 6", title: "Manali Local", desc: "Visit Hadimba Temple, Vashisht Hot Springs, Club House. Shopping at Mall Road." },
      { day: "Day 7", title: "Manali to Delhi", desc: "After breakfast, check-out. Board evening Volvo to Delhi. Tour ends." },
    ]
  },
  { id: 6, title: "Rishikesh River Retreat", destination: "Rishikesh, UK", duration: "5D / 4N", group: "4–20", difficulty: "Moderate" as const, rating: 4.8, reviews: 670, originalPrice: 14999, price: 11999, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80", highlights: ["White-Water Rafting", "Bungee Jumping", "Yoga Session", "Ganga Aarti"], includes: ["Resort", "Meals", "Activities", "Guide"], badge: "Thrilling", color: "from-cyan-500 to-cyan-600",
    itinerary: [
      { day: "Day 1", title: "Arrive in Rishikesh", desc: "Arrive and check-in at riverside resort. Evening witness Ganga Aarti at Triveni Ghat. Bonfire night." },
      { day: "Day 2", title: "Rafting & Cliff Jumping", desc: "Full day white-water rafting (16km). Cliff jumping, body surfing. Evening free time." },
      { day: "Day 3", title: "Bungee & Flying Fox", desc: "Morning bungee jumping and flying fox at Mohan Chatti. Afternoon visit Beatles Ashram." },
      { day: "Day 4", title: "Yoga & Neer Garh Waterfall", desc: "Morning yoga session by the river. Trek to Neer Garh Waterfall. Evening shopping at Laxman Jhula." },
      { day: "Day 5", title: "Departure", desc: "Early morning sunrise yoga. Check-out and transfer to Rishikesh bus stand." },
    ]
  },
];

export const hotels = [
  { id: 1, name: "HimQueen Estate & Resort", location: "Shimla", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", rating: 4.9, reviews: 420, price: 8999, desc: "Nestled in the lush hills of Shimla, this heritage property offers luxury suites, personal fireplaces, and majestic Himalayan views.", amenities: ["Heated Pool", "Spa", "Fine Dining", "Free WiFi", "Fireplace"], badge: "Luxury", badgeColor: "bg-amber-500",
    features: ["Heritage property with 50+ rooms", "In-house multi-cuisine restaurant", "Indoor heated swimming pool", "Full-service Ayurvedic spa", "Conference hall for events", "Bonfire area with mountain view", "24/7 room service", "Free parking"]
  },
  { id: 2, name: "The Grand Solitude Lodge", location: "Manali", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=80", rating: 4.8, reviews: 380, price: 7499, desc: "Perched overlooking Solang Valley, this modern sanctuary blends alpine style with peak luxury.", amenities: ["Jacuzzi", "Mountain View", "Bar", "Gym", "Room Service"], badge: "Premium", badgeColor: "bg-violet-500",
    features: ["Panoramic Solang Valley views", "Outdoor jacuzzi with mountain view", "In-house bar & restaurant", "Fully equipped gym", "Adventure desk for bookings", "Heated rooms with balcony", "Complimentary breakfast", "Airport shuttle service"]
  },
  { id: 3, name: "Dharamshala Retreat & Spa", location: "Dharamshala", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80", rating: 4.7, reviews: 290, price: 6499, desc: "A calm, spiritual luxury retreat surrounded by deodar forests in McLeod Ganj.", amenities: ["Yoga Studio", "Ayurvedic Spa", "Organic Café", "Library", "Garden"], badge: "Wellness", badgeColor: "bg-emerald-500",
    features: ["10 acres of deodar forest", "Daily yoga & meditation sessions", "Ayurvedic spa treatments", "Organic farm-to-table restaurant", "Tibetan cultural programs", "Nature walking trails", "Library with 5000+ books", "Free bike rental"]
  },
  { id: 4, name: "Snow Peak Mountain Camp", location: "Spiti Valley", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=700&q=80", rating: 4.6, reviews: 180, price: 4999, desc: "An exclusive high-altitude glamping experience in the heart of Spiti with panoramic mountain views and stargazing decks.", amenities: ["Glamping", "Bonfire", "Stargazing", "Local Cuisine", "Trek Guide"], badge: "Unique", badgeColor: "bg-cyan-500",
    features: ["Luxury Swiss tents with heating", "Stargazing deck at 12,500ft", "In-house kitchen with local cuisine", "Guided monastery treks", "Bonfire nights under the stars", "Oxygen cylinder on standby", "Photography assistance", "Transport from Kaza"]
  },
  { id: 5, name: "Riverside Heritage Hotel", location: "Rishikesh", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80", rating: 4.8, reviews: 520, price: 5999, desc: "A charming riverside hotel blending modern comfort with traditional Indian hospitality along the banks of the Ganges.", amenities: ["River View", "Yoga Deck", "Restaurant", "Free WiFi", "Parking"], badge: "Riverside", badgeColor: "bg-blue-500",
    features: ["Direct Ganges riverfront", "Private yoga deck by the river", "Multi-cuisine restaurant", "Rafting & adventure bookings", "Airport pickup/drop", "Garden with river view", "24/7 front desk", "Travel desk"]
  },
  { id: 6, name: "The Chopta Meadow Resort", location: "Chopta", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&q=80", rating: 4.5, reviews: 150, price: 3999, desc: "A cozy eco-resort nestled in the meadows of Chopta, offering stunning views of snow-capped peaks.", amenities: ["Eco-Friendly", "Trek Info", "Campfire", "Home-cooked Meals", "Garden"], badge: "Eco", badgeColor: "bg-lime-500",
    features: ["Eco-friendly cottages", "Meadow & mountain views", "Home-cooked pahadi meals", "Tungnath trek guide", "Campfire arrangements", "Bird watching tours", "Organic garden", "Solar-powered heating"]
  },
];

export const destinations = [
  { id: 1, name: "Manali", region: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80", rating: 4.9, reviews: 2140, price: 12999, badge: "Bestseller", badgeBg: "bg-amber-500", desc: "Snow-capped peaks, ancient temples, and vibrant café culture in the heart of Kullu Valley.", tags: ["Mountains", "Snow", "Adventure"],
    highlights: ["Solang Valley - Adventure sports hub", "Rohtang Pass - Snow paradise", "Old Manali - Cafés & nightlife", "Hadimba Temple - Ancient wooden temple", "Jogini Waterfall Trek", "Manikaran Hot Springs"] },
  { id: 2, name: "Spiti Valley", region: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&q=80", rating: 4.8, reviews: 870, price: 18499, badge: "Off-Beat", badgeBg: "bg-violet-500", desc: "A cold desert paradise with ancient monasteries, fossil sites, and the world's highest villages.", tags: ["Desert", "Culture", "Remote"],
    highlights: ["Key Monastery - Largest in Spiti", "Chandratal Lake - Moon Lake", "Kaza - District headquarters", "Hikkim - World's highest post office", "Langza - Fossil hunting village", "Dhankar Monastery - Cliff monastery"] },
  { id: 3, name: "Kasol", region: "Parvati Valley", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", rating: 4.7, reviews: 1390, price: 9499, badge: "Budget Pick", badgeBg: "bg-emerald-500", desc: "The backpacker's paradise along the Parvati River with pine forests and mountain trails.", tags: ["Backpacking", "Nature", "Trekking"],
    highlights: ["Kheerganga Trek - Hot springs", "Tosh Village - Snow peak views", "Manikaran Sahib - Hot springs", "Riverside camping", "Israeli cafés & culture", "Parvati River walks"] },
  { id: 4, name: "Leh Ladakh", region: "Jammu & Kashmir", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80", rating: 4.9, reviews: 3200, price: 24999, badge: "Premium", badgeBg: "bg-red-500", desc: "The land of high passes with pristine lakes, ancient monasteries, and breathtaking landscapes.", tags: ["Altitude", "Monastery", "Biking"],
    highlights: ["Pangong Lake - 3-color water", "Khardung La - World's highest road", "Nubra Valley - Double-hump camels", "Leh Palace - Royal heritage", "Magnetic Hill - Gravity defying", "Zanskar River rafting"] },
  { id: 5, name: "Chopta", region: "Uttarakhand", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&q=80", rating: 4.6, reviews: 520, price: 7999, badge: "Hidden Gem", badgeBg: "bg-cyan-500", desc: "Mini Switzerland of India with lush meadows and the Tungnath temple trek.", tags: ["Camping", "Trekking", "Wildlife"],
    highlights: ["Tungnath Temple - Highest Shiva temple", "Chandrashila Summit - 360° Himalayan view", "Bugyal Meadows - Alpine grasslands", "Deoriatal Lake - Star gazing", "Bird watching paradise", "Snow trek in winter"] },
  { id: 6, name: "Rishikesh", region: "Uttarakhand", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80", rating: 4.8, reviews: 4100, price: 6499, badge: "Most Popular", badgeBg: "bg-orange-500", desc: "The yoga capital of the world with white-water rafting, bungee, and spiritual retreats.", tags: ["Rafting", "Yoga", "Spiritual"],
    highlights: ["Ganga Aarti at Triveni Ghat", "White-water rafting", "Bungee jumping at Mohan Chatti", "Beatles Ashram", "Laxman Jhula & Ram Jhula", "Yoga teacher training"] },
  { id: 7, name: "Shimla", region: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&q=80", rating: 4.7, reviews: 2800, price: 8999, badge: "Classic", badgeBg: "bg-pink-500", desc: "The queen of hills with colonial architecture, scenic ridges, and toy train rides.", tags: ["Mountains", "Colonial", "Family"],
    highlights: ["Mall Road - Shopping paradise", "The Ridge - Heart of Shimla", "Kufri - Snow point", "Toy Train - UNESCO heritage", "Christ Church - 1857 church", "Jakhoo Temple - Hanuman statue"] },
  { id: 8, name: "Dharamshala", region: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&q=80", rating: 4.8, reviews: 1600, price: 7499, badge: "Spiritual", badgeBg: "bg-indigo-500", desc: "Home of the Dalai Lama with Tibetan culture, deodar forests, and mountain views.", tags: ["Spiritual", "Culture", "Nature"],
    highlights: ["Dalai Lama Temple Complex", "McLeod Ganj - Little Lhasa", "Bhagsu Waterfall", "Triund Trek", "Tibetan Market shopping", "Dal Lake"] },
  { id: 9, name: "Tirthan Valley", region: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", rating: 4.6, reviews: 380, price: 6999, badge: "Hidden", badgeBg: "bg-teal-500", desc: "Gateway to the Great Himalayan National Park with trout fishing and forest trails.", tags: ["Nature", "Wildlife", "Remote"],
    highlights: ["Great Himalayan National Park", "Trout fishing in Tirthan River", "Jalori Pass - Mountain pass", "Serolsar Lake Trek", "Chhoie Waterfall", "Homestay culture"] },
];
