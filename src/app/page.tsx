import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import SimulateursSection from "@/components/home/SimulateursSection";
import EtapesSection from "@/components/home/EtapesSection";
import CouvertureSection from "@/components/home/CouvertureSection";
import TemoignagesSection from "@/components/home/TemoignagesSection";
import FaqSection from "@/components/home/FaqSection";
import ArticlesSection from "@/components/home/ArticlesSection";
import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "MaFranceLocale — Simulateurs gratuits pour votre logement",
  description:
    "Evaluez gratuitement les aides, le confort et le DPE de votre logement en 2 minutes. Sans engagement, accompagnement local.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <SimulateursSection />
      <EtapesSection />
      <CouvertureSection />
      <TemoignagesSection />
      <FaqSection />
      <ArticlesSection />
      <ContactSection />
    </main>
  );
}
