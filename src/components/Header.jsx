import { useState, useEffect } from "react";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../store/themeStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/tours" },
  { label: "Treks", href: "/treks" },
  { label: "Hotels", href: "/hotels" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? dark
          ? "bg-[#0f0f1a]/95 backdrop-blur-md shadow-sm border-b border-gray-800"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
        : dark ? "bg-[#0f0f1a]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="w-9 h-9 rounded-lg bg-[#1a1a2e] dark:bg-[#b8860b] flex items-center justify-center text-[#b8860b] dark:text-[#1a1a2e] font-bold text-sm">
              HQK
            </span>
            <span className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-[#1a1a2e]"}`}>
              HimQueenKing
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isActive(link.href)
                    ? "text-[#b8860b] bg-[#b8860b]/10"
                    : dark
                      ? "text-gray-400 hover:text-white hover:bg-white/5"
                      : "text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              className={`p-2.5 rounded-xl transition-all ${
                dark
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="https://wa.me/919805556015"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                dark
                  ? "text-gray-300 hover:text-[#b8860b] border border-gray-700 hover:border-[#b8860b]"
                  : "text-gray-700 hover:text-[#b8860b] border border-gray-200 hover:border-[#b8860b]"
              }`}
            >
              <Phone size={15} />
              Call Now
            </a>
            <a
              href="/dream-destination"
              className="hidden sm:inline-flex btn-primary text-sm py-2.5! px-5!"
            >
              Plan Your Trip
            </a>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition ${dark ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`lg:hidden border-t shadow-lg ${dark ? "bg-[#0f0f1a] border-gray-800" : "bg-white border-gray-100"}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive(link.href)
                    ? "bg-[#b8860b]/10 text-[#b8860b]"
                    : dark
                      ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/dream-destination"
              className="block mt-3 px-4 py-3 rounded-xl bg-[#b8860b] text-white text-center font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Plan Your Trip
            </a>
            <a
              href="https://wa.me/919805556015"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium ${dark ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"}`}
              onClick={() => setMobileOpen(false)}
            >
              <Phone size={16} /> +91 98055 56015
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
