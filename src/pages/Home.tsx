import Hero from "../components/Hero";
import DestinationsSection from "../components/DestinationsSection";
import TourPackagesSection from "../components/TourPackagesSection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => (
  <main>
    <Hero />
    <DestinationsSection />
    <StatsSection />
    <TourPackagesSection />
    <Testimonials />
    <Newsletter />
  </main>
);

export default Home;
