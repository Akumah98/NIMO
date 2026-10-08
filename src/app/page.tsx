import HeroSection from "@/components/home/HeroSection";
import QuickAnchorBar from "@/components/home/QuickAnchorBar";
import AboutSection from "@/components/home/AboutSection";
import StrategySection from "@/components/home/StrategySection";
import AreasOfIntervention from "@/components/home/AreasOfIntervention";
import ImpactSection from "@/components/home/ImpactSection";
import FieldGallerySection from "@/components/home/FieldGallerySection";
import PartnersSection from "@/components/home/PartnersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAnchorBar />
      <AboutSection />
      <StrategySection />
      <AreasOfIntervention />
      <ImpactSection />
      <FieldGallerySection />
      <PartnersSection />
      <TestimonialsSection />
    </>
  );
}
