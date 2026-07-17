import Hero from "../components/Hero";
import BudgetPlanner from "../components/BudgetPlanner";
import DestinationsSection from "../components/DestinationsSection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import SEO from "../components/SEO";

const Home = () => (
  <>
    <SEO
      title="Best Himachal Pradesh, Shimla Manali & Himalaya Tour Packages 2026"
      description="Book curated tour packages to Shimla Manali, Spiti Valley, Leh Ladakh, Kasol, Rishikesh & more. HimQueenKing — the best travel agency in Himachal Pradesh for Himalaya tours, trekking, hotels & adventure packages."
      keywords="himachal pradesh tour packages, shimla manali tour package, himalaya trekking packages, manali tour package, spiti valley tour, leh ladakh tour, kasol backpacking trip, himachal trek packages, best travel agency himachal, shimla manali tour, manali tour, shimla tour, kedarnath yatra, rishikesh tour, himachal pradesh travel"
      url="https://himqueenking.onrender.com"
    />
    <main>
      <Hero />
      <BudgetPlanner />
      <DestinationsSection />
      <StatsSection />
      <Testimonials />
      <Newsletter />
    </main>
  </>
);

export default Home;
