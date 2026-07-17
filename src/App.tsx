import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
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
import AdminLayout from "./pages/admin/AdminLayout";
import Login from "./pages/admin/Login";
import NotFound from "./pages/NotFound";

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col bg-[#faf9f6]">
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <Footer />
    <WhatsAppButton />
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<PublicLayout />} />
    </Routes>
  </BrowserRouter>
);

export default App;
