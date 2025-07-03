"use client";
import HeroSection from "./sections/hero-section";
import PortfolioSection from "./sections/portfolio-section";
import ServicesSection from "./sections/services-section";
import ProcessSection from "./sections/process-section";
import BenefitsSection from "./sections/benefits-section";
import ConsultationSection from "./sections/consultation-section";

export default function Section() {
  return (
    <section className="pt-16 mt-8 md:mt-0 md:pt-24 lg:pt-32 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <ProcessSection />
        <BenefitsSection />
        <ConsultationSection />
      </div>
    </section>
  );
}
