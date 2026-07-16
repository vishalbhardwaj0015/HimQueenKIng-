import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../store/authStore";
import { useTheme } from "../store/themeStore";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, load } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let data: Record<string, unknown>;
      if (isLogin) {
        data = await api.login(form.email, form.password) as Record<string, unknown>;
      } else {
        if (!form.name.trim()) { setError("Name is required"); setLoading(false); return; }
        data = await api.register(form.name, form.email, form.password) as Record<string, unknown>;
      }
      login(data.user as { id: number; name: string; email: string; role: string }, data.token as string);
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`pt-24 pb-20 min-h-screen flex items-center justify-center px-4 transition-colors ${dark ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange-500/25">
              HQK
            </span>
          </a>
          <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {isLogin
              ? "Sign in to manage your bookings and trips"
              : "Join HimQueenKing to explore the Himalayas"}
          </p>
        </div>

        {/* Card */}
        <div className={`rounded-2xl shadow-xl p-8 transition-colors ${dark ? "bg-gray-900 border border-gray-800" : "bg-white"}`}>
          {/* Tabs */}
          <div className={`flex rounded-xl p-1 mb-6 ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                isLogin
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                !isLogin
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Register only) */}
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-gray-300" : "text-gray-700"}`}>Full Name</label>
                <div className="relative">
                  <User size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-gray-500" : "text-gray-400"}`} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      dark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-gray-300" : "text-gray-700"}`}>Email Address</label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    dark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-gray-300" : "text-gray-700"}`}>Password</label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    dark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className={`text-center text-sm mt-6 ${dark ? "text-gray-500" : "text-gray-400"}`}>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-orange-500 hover:text-orange-400 font-medium">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="text-orange-500 hover:text-orange-400 font-medium">
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>

        {/* Admin Link */}
        <p className={`text-center text-xs mt-6 ${dark ? "text-gray-600" : "text-gray-400"}`}>
          Are you an admin?{" "}
          <a href="/admin/login" className="text-orange-500 hover:text-orange-400">
            Admin Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
