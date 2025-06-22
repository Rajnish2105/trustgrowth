"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: "fas fa-gavel",
    title: "Expert Bidding",
    description:
      "Professional bidders with years of experience ensuring your success in every auction.",
  },
  {
    icon: "fas fa-chart-bar",
    title: "Market Analysis",
    description:
      "Deep market insights and real-time analysis to maximize your bidding strategy.",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Secure Process",
    description:
      "100% secure and confidential bidding process with complete transparency.",
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
    <section id="services" className="py-24 bg-white/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive auction solutions tailored for your success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
