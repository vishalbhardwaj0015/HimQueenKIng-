/**
 * dataStore.ts
 * Central data store using localStorage.
 * Admin writes here; public pages read from here.
 */

export interface TrekItem {
  id: string;
  title: string;
  desc: string;
  price: number;
  img: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  duration: string;
  altitude: string;
  bestTime: string;
}

export interface HotelItem {
  id: string;
  name: string;
  location: string;
  desc: string;
  price: number;
  img: string;
  amenities: string[];
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  desc: string;
  price: number;
  img: string;
  duration: string;
  includes: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  price: number;
  img: string;
  spots: number;
}

// ---------- Default seed data ----------
const defaultTreks: TrekItem[] = [
  {
    id: '1',
    title: 'Hampta Pass Trek',
    desc: 'One of the most dramatic crossover treks in Himachal. Traverses from the lush green meadows of Kullu Valley to the cold desert landscape of Lahaul.',
    price: 8499,
    img: '/src/assets/trek-hampta.jpg',
    difficulty: 'Moderate',
    duration: '5 Days / 4 Nights',
    altitude: '14,100 ft',
    bestTime: 'Mid June to October',
  },
  {
    id: '2',
    title: 'Kheerganga & Parvati Valley',
    desc: 'An iconic alpine trek inside the scenic Parvati Valley. Reaches a scenic meadow famous for its healing hot springs.',
    price: 3499,
    img: '/src/assets/trek-kheerganga.jpg',
    difficulty: 'Easy',
    duration: '2 Days / 1 Night',
    altitude: '9,700 ft',
    bestTime: 'April to November',
  },
  {
    id: '3',
    title: 'Triund Ridge Expedition',
    desc: 'The crown jewel of Dharamshala, offering majestic panoramic views of the Dhauladhar range and Kangra valley.',
    price: 2999,
    img: '/src/assets/trek-triund.jpg',
    difficulty: 'Easy',
    duration: '2 Days / 1 Night',
    altitude: '9,350 ft',
    bestTime: 'March to December',
  },
];

const defaultHotels: HotelItem[] = [
  {
    id: '1',
    name: 'HimQueen Estate & Resort',
    location: 'Shimla',
    desc: 'Nestled in the lush hills of Shimla, this heritage property offers luxury suites, personal fireplaces, heated indoor pool, and majestic Himalayan views.',
    price: 8999,
    img: '/src/assets/hotel-shimla.jpg',
    amenities: ['Heated Pool', 'Spa', 'Fine Dining', 'Free WiFi', 'Fireplace'],
  },
  {
    id: '2',
    name: 'The Grand Solitude Lodge',
    location: 'Manali',
    desc: 'Perched overlooking the Solang Valley, this modern sanctuary blends alpine style with peak luxury. Features outdoor jacuzzi and sky decks.',
    price: 7499,
    img: '/src/assets/hotel-manali.jpg',
    amenities: ['Outdoor Jacuzzi', 'Mountain Deck', 'Ski Access', 'Bar', 'Gym'],
  },
  {
    id: '3',
    name: 'Dharamshala Retreat & Spa',
    location: 'Dharamshala',
    desc: 'A calm, spiritual luxury retreat surrounded by deodar forests in McLeod Ganj. Features yoga studios and ayurvedic massage spa.',
    price: 6499,
    img: '/src/assets/hotel-dharamshala.jpg',
    amenities: ['Yoga Studio', 'Ayurvedic Spa', 'Organic Café', 'Library', 'Garden'],
  },
];

const defaultPackages: TravelPackage[] = [
  {
    id: '1',
    title: 'Shimla–Manali Grand Tour',
    destination: 'Shimla & Manali',
    desc: 'The classic Himachal experience. Explore the colonial charm of Shimla and the dramatic valleys of Manali in one curated journey.',
    price: 22999,
    img: '/src/assets/dest-shimla.jpg',
    duration: '7 Days / 6 Nights',
    includes: ['Hotel Stay', 'All Meals', 'AC Transport', 'Tour Guide'],
  },
  {
    id: '2',
    title: 'Spiti Valley Overland',
    destination: 'Spiti Valley',
    desc: 'An off-the-beaten-path adventure through the cold desert of Spiti. Visit ancient monasteries, fossil sites, and the world\'s highest villages.',
    price: 18999,
    img: '/src/assets/dest-spiti.jpg',
    duration: '8 Days / 7 Nights',
    includes: ['Camp Stay', 'Breakfast & Dinner', 'Jeep Safari', 'Permits'],
  },
  {
    id: '3',
    title: 'Kasol – Parvati Valley Retreat',
    destination: 'Kasol & Manikaran',
    desc: 'A soul-rejuvenating retreat along the banks of the Parvati River. Perfect for backpackers, yoga lovers, and nature seekers.',
    price: 9999,
    img: '/src/assets/dest-kasol.jpg',
    duration: '4 Days / 3 Nights',
    includes: ['Hostel Stay', 'Breakfast', 'Guide', 'River Camping Night'],
  },
];

const defaultEvents: EventItem[] = [
  {
    id: '1',
    title: 'Rohtang Snow Festival 2026',
    date: '2026-07-15',
    location: 'Rohtang Pass, Manali',
    desc: 'A spectacular high-altitude festival celebrating Himalayan culture with snow sports, folk music, and traditional cuisine at 13,000 ft.',
    price: 1499,
    img: '/src/assets/hero-himalaya.jpg',
    spots: 50,
  },
  {
    id: '2',
    title: 'Spiti Stargazing Camp',
    date: '2026-08-10',
    location: 'Langza Village, Spiti',
    desc: 'Spend two nights at one of India\'s clearest skies. Expert astronomer guides, telescope sessions, and Milky Way photography workshops.',
    price: 3999,
    img: '/src/assets/dest-spiti.jpg',
    spots: 20,
  },
];

// ---------- Store helpers ----------
const KEYS = {
  treks: 'hq_treks',
  hotels: 'hq_hotels',
  packages: 'hq_packages',
  events: 'hq_events',
};

function seed<T>(key: string, defaults: T[]): T[] {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(raw);
}

export const Store = {
  // Treks
  getTreks: (): TrekItem[] => seed(KEYS.treks, defaultTreks),
  saveTreks: (data: TrekItem[]) => localStorage.setItem(KEYS.treks, JSON.stringify(data)),

  // Hotels
  getHotels: (): HotelItem[] => seed(KEYS.hotels, defaultHotels),
  saveHotels: (data: HotelItem[]) => localStorage.setItem(KEYS.hotels, JSON.stringify(data)),

  // Packages
  getPackages: (): TravelPackage[] => seed(KEYS.packages, defaultPackages),
  savePackages: (data: TravelPackage[]) => localStorage.setItem(KEYS.packages, JSON.stringify(data)),

  // Events
  getEvents: (): EventItem[] => seed(KEYS.events, defaultEvents),
  saveEvents: (data: EventItem[]) => localStorage.setItem(KEYS.events, JSON.stringify(data)),
};

export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
