import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <p className="text-8xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ArrowLeft size={16} /> Go Back
        </button>
        <Link to="/" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all">
          <Home size={16} /> Home
        </Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
