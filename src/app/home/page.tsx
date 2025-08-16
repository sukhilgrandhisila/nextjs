import Navbar from "@/components/Navbar";
import HomeComponent from "@/components/Home";
import TrendingSection from "@/components/TrendingSection";
import TopRatedSection from "@/components/TopRatedSection";
import OriginalsSection from "@/components/OriginalsSection";
import PopularSection from "@/components/PopularSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section id="home">
        <HomeComponent />
      </section>

      {/* Sections */}
      <section id="trending">
        <TrendingSection />
      </section>

      <section id="top-rated">
        <TopRatedSection />
      </section>

      <section id="originals">
        <OriginalsSection />
      </section>

      <section id="popular">
        <PopularSection />
      </section>
    </>
  );
}
