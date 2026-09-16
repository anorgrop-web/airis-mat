import Hero from "@/components/sections/Hero";
import FeaturesMarquee from "@/components/sections/FeaturesMarquee";
import ProblemSection from "@/components/sections/ProblemSection";
import KeyBenefits from "@/components/sections/KeyBenefits";
import TechnologyBlocks from "@/components/sections/TechnologyBlocks";
import ValueSection from "@/components/sections/ValueSection";
import ComparisonTable from "@/components/sections/ComparisonTable";
import SetupSteps from "@/components/sections/SetupSteps";
import Testimonials from "@/components/sections/Testimonials";
import Reviews from "@/components/sections/Reviews";
import ExpertSection from "@/components/sections/ExpertSection";
import FAQ from "@/components/sections/FAQ";
import PurchaseCTA from "@/components/sections/PurchaseCTA";
import BundleSelector from "@/components/sections/BundleSelector";
import Guarantee from "@/components/sections/Guarantee";
import FixedConversionBar from "@/components/sections/FixedConversionBar";

// Header and Footer are rendered by app/layout.tsx so every page (incl. policies) shares them.
// Section order follows the operation's base landing page (see lib/constants.ts header).
export default function HomePage() {
  return (
    <main className="pb-24">
      <Hero />
      <FeaturesMarquee />
      <ProblemSection />
      <KeyBenefits />
      <TechnologyBlocks />
      <ValueSection />
      <ComparisonTable />
      <SetupSteps />
      <Testimonials />
      <Reviews />
      <ExpertSection />
      <FAQ />
      <PurchaseCTA />
      <BundleSelector />
      <Guarantee />
      <FixedConversionBar />
    </main>
  );
}
