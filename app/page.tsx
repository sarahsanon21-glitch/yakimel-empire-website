import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import MissionVision from "@/components/MissionVision";
import Expertise from "@/components/Expertise";
import Approach from "@/components/Approach";
import Values from "@/components/Values";
import Ecosystem from "@/components/Ecosystem";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductGrid />
      <About />
      <MissionVision />
      <Expertise />
      <Approach />
      <Values />
      <Ecosystem />
      <WhyUs />
      <FAQ />
      <Contact />
    </main>
  );
}