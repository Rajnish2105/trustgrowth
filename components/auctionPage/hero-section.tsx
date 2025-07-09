"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Award, Clock, Shield } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-32 pb-20 bg-gradient-to-b from-yellow-50 to-amber-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-amber-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-300/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🟡 <span>Online Gold Auction Bidding Service</span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-gray-800">
              Expert{" "}
              <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Gold Auction
              </span>{" "}
              Bidding by TrustGrowth
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Professional freelance gold auction bidding services with highly
              trained speed typists. We specialize in securing auction packets
              on <strong>Procure Tiger</strong> and <strong>Gold Samil</strong>{" "}
              platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-2 md:gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 md:p-3">
                <Zap className="w-4 h-4 md:w-6 md:h-6 text-yellow-600" />
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  Fast & Accurate Typing
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 md:p-3">
                <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-600" />
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  Real-Time Auctions
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 md:p-3">
                <Award className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  Proven Track Record
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 md:p-3">
                <Shield className="w-4 h-4 md:w-6 md:h-6 text-yellow-700" />
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  On-Demand Support
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-4 mb-8 md:mb-12">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold flex items-center justify-center gap-2 md:gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg text-sm md:text-lg"
              >
                <span>Start Your First FREE Auction</span>
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                href="#process"
                className="border-2 border-amber-500 text-amber-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold flex items-center justify-center gap-2 md:gap-3 hover:bg-amber-50 transition-all duration-300 text-sm md:text-lg"
              >
                <span>How It Works</span>
              </Link>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl md:rounded-2xl p-4 md:p-6 border border-yellow-200">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                🎁 Special Offer for New Bidders
              </h3>
              <p className="text-sm md:text-base text-gray-700">
                Your first auction is completely FREE! Pay only if you&apos;re
                satisfied with our service.
              </p>
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative group">
              <div className="bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/images/auction.jpg"
                  alt="Gold auction bidding process"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                <span className="text-lg md:text-2xl">🏆</span>
              </div>

              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-xl animate-pulse">
                <span className="text-2xl">⚡</span>
              </div>

              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <span className="text-lg">💰</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
