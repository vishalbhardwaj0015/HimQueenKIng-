import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, User, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "../store/themeStore";
import { useAuth } from "../store/authStore";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/tours" },
  { label: "Treks", href: "/treks" },
  { label: "Hotels", href: "/hotels" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { user, logout, load } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setProfileOpen(false); }, [location]);

  const onTop = !scrolled;

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? dark
            ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-700/60 shadow-lg shadow-black/30"
            : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg shadow-black/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group shrink-0">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-shadow">
              HQK
            </span>
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                onTop ? "text-white" : dark ? "text-white" : "text-gray-900"
              }`}
            >
              HimQueenKing
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href) ? "nav-active" : ""
                } ${
                  onTop
                    ? "text-white/80 hover:text-white"
                    : dark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/dream-destination"
              className={`hidden sm:inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                onTop
                  ? "bg-white/15 text-white border border-white/25 hover:bg-white/25"
                  : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              }`}
            >
              Plan Your Trip
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                onTop
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : dark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              /* Logged In - Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    onTop
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : dark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border z-50 overflow-hidden ${
                      dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}>
                      <div className={`px-4 py-3 border-b ${dark ? "border-gray-700" : "border-gray-100"}`}>
                        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                        <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{user.email}</p>
                      </div>
                      <div className="py-1">
                        {user.role === "admin" || user.role === "staff" ? (
                          <a
                            href="/admin/dashboard"
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${dark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                          >
                            <span>⚙️</span> Admin Panel
                          </a>
                        ) : null}
                        <button
                          onClick={handleLogout}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 ${dark ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Logged Out - Login/Register */
              <a
                href="/login"
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  onTop
                    ? "text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
                    : dark
                      ? "text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <User size={15} />
                Login
              </a>
            )}

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                onTop
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : dark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
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
        <div
          className={`lg:hidden border-t shadow-xl ${
            dark
              ? "bg-gray-900 border-gray-700/60"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive(link.href)
                    ? dark
                      ? "bg-gray-800 text-orange-400"
                      : "bg-orange-50 text-orange-600"
                    : dark
                      ? "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
                      : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/dream-destination"
              className="block mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Plan Your Trip
            </a>

            {/* Mobile Auth */}
            <div className={`mt-3 pt-3 border-t ${dark ? "border-gray-700" : "border-gray-200"}`}>
              {user ? (
                <>
                  <div className="px-4 py-2 mb-2">
                    <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                    <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{user.email}</p>
                  </div>
                  {(user.role === "admin" || user.role === "staff") && (
                    <a
                      href="/admin/dashboard"
                      className={`block px-4 py-3 rounded-lg font-medium ${dark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      ⚙️ Admin Panel
                    </a>
                  )}
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={18} /> Login / Sign Up
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
