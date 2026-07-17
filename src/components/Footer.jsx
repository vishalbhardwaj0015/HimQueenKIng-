import { MapPin, Phone, Mail } from "lucide-react";

const socialLinks = [
  { href: "#", label: "Instagram", path: "M16 3.04a4 4 0 0 1 3.84 3.84A8 8 0 0 1 24 12a8 8 0 0 1-4.16 6.96A4 4 0 0 1 16 22.8a4 4 0 0 1-3.84-3.84A8 8 0 0 1 8 12a8 8 0 0 1 4.16-6.96A4 4 0 0 1 16 3.04z" },
  { href: "#", label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { href: "#", label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" },
];

const Footer = () => (
  <footer className="bg-[#1a1a2e] text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <a href="/" className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-lg bg-[#b8860b] flex items-center justify-center text-white font-bold text-sm">HQK</span>
            <span className="text-lg font-bold text-white">HimQueenKing</span>
          </a>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            Crafting unforgettable Himalayan journeys since 2010. Your trusted travel partner for Manali, Ladakh, Spiti, and beyond.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#b8860b]/20 hover:text-[#b8860b] transition-all text-gray-400">
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
            {[
              { label: "Home", href: "/" },
              { label: "Destinations", href: "/destinations" },
              { label: "Tour Packages", href: "/tours" },
              { label: "Hotels & Stays", href: "/hotels" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Tours */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Popular Tours</h4>
          <ul className="space-y-2.5">
            {["Manali Snow Adventure", "Spiti Valley Expedition", "Leh Ladakh Royal Ride", "Kasol Backpacking", "Shimla Manali Grand Tour"].map((tour) => (
              <li key={tour}>
                <a href="/tours" className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors">{tour}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={16} className="text-[#b8860b] mt-0.5 shrink-0" />
              <span>Mall Road, Manali, Himachal Pradesh, India 175131</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-[#b8860b] shrink-0" />
              <a href="tel:+919805556015" className="text-gray-400 hover:text-[#b8860b] transition-colors">+91 98055 56015</a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-[#b8860b] shrink-0" />
              <a href="mailto:hello@himqueenking.com" className="text-gray-400 hover:text-[#b8860b] transition-colors">hello@himqueenking.com</a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-10 h-10 rounded-lg bg-[#b8860b]/20 flex items-center justify-center text-[#b8860b] text-lg">🏆</div>
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
          <a href="#privacy" className="hover:text-[#b8860b] transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#b8860b] transition-colors">Terms of Service</a>
          <a href="#refund" className="hover:text-[#b8860b] transition-colors">Refund Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
