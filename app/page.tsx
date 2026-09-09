import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import FeaturesMarquee from "@/components/sections/FeaturesMarquee";
import KeyBenefits from "@/components/sections/KeyBenefits";
import TechnologyBlocks from "@/components/sections/TechnologyBlocks";
import CustomerStats from "@/components/sections/CustomerStats";
import ComparisonTable from "@/components/sections/ComparisonTable";
import SetupSteps from "@/components/sections/SetupSteps";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import PurchaseCTA from "@/components/sections/PurchaseCTA";
import BundleSelector from "@/components/sections/BundleSelector";
import Guarantee from "@/components/sections/Guarantee";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesMarquee />
        <KeyBenefits />
        <TechnologyBlocks />
        <CustomerStats />
        <ComparisonTable />
        <SetupSteps />
        <Reviews />
        <FAQ />
        <PurchaseCTA />
        <BundleSelector />
        <Guarantee />
      </main>
      <Footer />
    </>
  );
}
