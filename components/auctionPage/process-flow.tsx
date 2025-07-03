"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  FileText,
  Users,
  TrendingUp,
  CreditCard,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Register for our gold auction bidding service",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: FileText,
    title: "Submit Auction ID",
    description: "Provide your auction details by contacting us",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Our Team Bids",
    description: "Professional speed typists handle your bidding",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Result",
    description: "Get real-time updates on auction outcomes",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Pay only after successful completion",
    color: "from-yellow-600 to-amber-600",
  },
];

export default function ProcessFlow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("process");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            📊 Step-by-Step Process Flow
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Simple and transparent process to get you started with professional
            gold auction bidding
          </p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop - positioned below content */}
          <div className="hidden lg:block absolute bottom-16 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 relative z-10 pb-16 md:pb-20">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl border-4 border-white`}
                  >
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed px-2">
                    {step.description}
                  </p>

                  {/* Step number */}
                  <div className="mt-3 md:mt-4">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r ${step.color} text-white rounded-full text-xs md:text-sm font-bold`}
                    >
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
