"use client";

import { useEffect, useState } from "react";

export default function PlatformSupport() {
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

    const element = document.getElementById("platforms");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="platforms"
      className="py-20 bg-gradient-to-b from-yellow-50 to-amber-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            Supported Platforms
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            We provide expert bidding services on major gold auction platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-yellow-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-xl">
                    PT
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                    Procure Tiger
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Leading auction platform
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Specialized expertise in Procure Tiger platform with proven
                track record of successful bids and deep understanding of
                platform dynamics.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-yellow-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-xl">
                    GS
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                    Gold Samridhi (Samil)
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Premium gold auction platform
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Expert knowledge of Gold Samridhi platform operations with
                optimized bidding strategies tailored for maximum success rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
