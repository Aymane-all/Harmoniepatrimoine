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
  title: "Ma France Locale — Estimez vos Aides Rénovation, DPE & Confort",
  description:
    "Estimez gratuitement vos aides financières de rénovation énergétique (MaPrimeRénov' 2026), votre classe DPE et le confort de votre maison en 2 minutes.",
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
