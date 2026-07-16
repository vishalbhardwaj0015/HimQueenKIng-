import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const socialLinks = [
  { href: "#", label: "Instagram", path: "M16 3.04a4 4 0 0 1 3.84 3.84A8 8 0 0 1 24 12a8 8 0 0 1-4.16 6.96A4 4 0 0 1 16 22.8a4 4 0 0 1-3.84-3.84A8 8 0 0 1 8 12a8 8 0 0 1 4.16-6.96A4 4 0 0 1 16 3.04z" },
  { href: "#", label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { href: "#", label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" },
  { href: "#", label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
];

const Footer = () => (
  <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <a href="/" className="flex items-center gap-2 mb-4">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg">HQK</span>
            <span className="text-xl font-bold text-white">HimQueenKing</span>
          </a>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            Your gateway to the majestic Himalayas. We craft unforgettable journeys through India's most stunning mountain landscapes.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-400 transition-all text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {["Home", "Destinations", "Tour Packages", "About Us", "Blog", "Contact"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Tours */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Popular Tours</h4>
          <ul className="space-y-2.5">
            {["Manali Snow Adventure", "Spiti Valley Expedition", "Leh Ladakh Royal Ride", "Kasol Backpacking", "Chopta Trek", "Rishikesh River Retreat"].map((tour) => (
              <li key={tour}>
                <a href="/tours" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{tour}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={16} className="text-orange-400 mt-0.5 shrink-0" />
              <span>Mall Road, Manali, Himachal Pradesh, India 175131</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-orange-400 shrink-0" />
              <a href="tel:+911800123456" className="text-gray-400 hover:text-orange-400 transition-colors">+91 1800-123-456</a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-orange-400 shrink-0" />
              <a href="mailto:hello@himqueenking.com" className="text-gray-400 hover:text-orange-400 transition-colors">hello@himqueenking.com</a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <span className="text-2xl">🏆</span>
            <div className="text-xs">
              <p className="text-white font-semibold">Award Winning Agency</p>
              <p className="text-gray-500">Best Himalayan Tour Operator 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} HimQueenKing. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          <a href="#refund" className="hover:text-orange-400 transition-colors">Refund Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
