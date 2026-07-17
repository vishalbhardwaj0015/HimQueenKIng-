import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Treks from "./pages/Treks";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DreamDestination from "./pages/DreamDestination";
import UserLogin from "./pages/UserLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageTours from "./pages/admin/ManageTours";
import ManageTreks from "./pages/admin/ManageTreks";
import ManageHotels from "./pages/admin/ManageHotels";
import ManagePackages from "./pages/admin/ManagePackages";
import Requests from "./pages/admin/Requests";
import NotFound from "./pages/NotFound";
import { useTheme } from "./store/themeStore";
import { useAuth } from "./store/authStore";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, load } = useAuth();
  useEffect(() => { load(); }, [load]);
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.role !== "admin" && user.role !== "staff") return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AdminRoutes = () => (
  <AdminGuard>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tours" element={<ManageTours />} />
        <Route path="treks" element={<ManageTreks />} />
        <Route path="hotels" element={<ManageHotels />} />
        <Route path="packages" element={<ManagePackages />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  </AdminGuard>
);

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
    <Header />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/treks" element={<Treks />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dream-destination" element={<DreamDestination />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

const App = () => {
  const loadTheme = useTheme((s) => s.load);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
