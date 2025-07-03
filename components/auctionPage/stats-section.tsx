"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Award,
    number: "500+",
    label: "Successful Auctions",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "Win Rate",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    number: "200+",
    label: "Happy Clients",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Support Available",
    color: "from-yellow-600 to-amber-600",
  },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg`}
                >
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div
                  className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 md:mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
