"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, Target, Shield, Headphones } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Fast and Accurate Typing by Professionals",
    description:
      "Our highly trained speed typists ensure lightning-fast and precise bidding to secure your auction packets.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: Target,
    title: "Experienced with Real-Time Gold Auctions",
    description:
      "Years of experience in live gold auction environments with proven success rates across multiple platforms.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Support for Procure Tiger & Gold Samil Platforms",
    description:
      "Specialized expertise in bidding on major platforms including Procure Tiger and Gold Samridhi (Samil).",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Headphones,
    title: "Freelance Bidding Support Available On-Demand",
    description:
      "Flexible freelance support available whenever you need it, with professional bidding assistance on-demand.",
    color: "from-yellow-600 to-amber-600",
  },
];

export default function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-amber-50 to-yellow-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            🔑 Key Service Features
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Professional gold auction bidding services designed to maximize your
            success rate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 ${
                  visibleCards[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${service.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg`}
                >
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
                  ✅ {service.title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
