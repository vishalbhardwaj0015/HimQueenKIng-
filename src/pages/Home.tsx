import Hero from "../components/Hero";
import BudgetPlanner from "../components/BudgetPlanner";
import DestinationsSection from "../components/DestinationsSection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => (
  <main>
    <Hero />
    <BudgetPlanner />
    <DestinationsSection />
    <StatsSection />
    <Testimonials />
    <Newsletter />
  </main>
);

export default Home;
