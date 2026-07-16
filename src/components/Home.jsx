import React from "react";
import Hero from "./Hero";
import DestinationsSection from "./DestinationsSection";
import TourPackagesSection from "./TourPackagesSection";
import StatsSection from "./StatsSection";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <main id="main-content">
      <Hero />
      <DestinationsSection />
      <StatsSection />
      <TourPackagesSection />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
