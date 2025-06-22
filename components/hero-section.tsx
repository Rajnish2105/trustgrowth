"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-6 text-gray-800">
              Smart Solutions for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Auctions, Web Development & Market Analysis
              </span>{" "}
              — All in One Place
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Trust Growth offers expert-driven auction bidding, custom website
              development, and smart stock market analysis. Our dedicated team
              combines innovation with strategy to deliver reliable solutions
              that help your business thrive in every digital space.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span>Contact Us Now</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Successful Auctions
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  89%
                </div>
                <div className="text-sm text-gray-500 mt-1">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-gray-500 mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl overflow-hidden">
              {/* Rotating glow effect */}
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-conic-gradient opacity-10 animate-spin-slow"></div>

              <div className="relative z-10">
                <Image
                  src="/images/auction.jpg"
                  alt="Auction bidding"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Floating icons */}
              <div className="absolute top-1/5 right-1/10 w-15 h-15 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-float">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="absolute bottom-1/3 left-1/10 w-15 h-15 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-float-delayed-1">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="absolute top-3/5 right-1/5 w-15 h-15 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-float-delayed-2">
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
