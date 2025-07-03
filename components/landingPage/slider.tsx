"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Users, Award, type LucideIcon } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  gradient: string;
  bgGradient: string;
  icon: LucideIcon;
  features: string[];
  stats: {
    number: string;
    label: string;
  };
}

interface SliderProps {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  slides: Slide[];
  currentSlide: number;
}

export default function Slider({
  setCurrentSlide,
  slides,
  currentSlide,
}: SliderProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 1000 || isScrolling) return;

      lastScrollTime.current = now;
      setIsScrolling(true);

      if (e.deltaY > 0) {
        // Scroll down - move to next slide
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Scroll up - move to previous slide
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }

      setTimeout(() => setIsScrolling(false), 1000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [isScrolling, slides.length, setCurrentSlide]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 1000 || isScrolling) return;

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        lastScrollTime.current = now;
        setIsScrolling(true);

        if (diff > 0) {
          // Swipe up - move to next slide
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        } else {
          // Swipe down - move to previous slide
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }

        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isScrolling, slides.length, setCurrentSlide]);

  const getSlidePosition = (index: number) => {
    const diff = (index - currentSlide + slides.length) % slides.length;
    if (diff === 0) return "translate-y-0 z-30 scale-100 opacity-100";
    if (diff === 1) return "translate-y-[100vh] z-20 scale-95 opacity-0";
    if (diff === 2) return "translate-y-[200vh] z-10 scale-90 opacity-0";
    return "translate-y-[300vh] z-0 scale-85 opacity-0";
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${getSlidePosition(
                index
              )}`}
            >
              <div className="flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
                <div
                  className={`w-full max-w-7xl mx-auto h-[85vh] sm:h-[80vh] rounded-2xl sm:rounded-3xl bg-gradient-to-br ${slide.bgGradient} backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden`}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-10`}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full p-6 sm:p-8 md:p-12">
                      {/* Left Content - Always visible */}
                      <div className="flex flex-col justify-center space-y-4 sm:space-y-6 relative">
                        {/* Mobile-only decorative elements */}
                        <div className="lg:hidden absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                        <div className="lg:hidden absolute top-1/2 -left-8 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
                        <div className="lg:hidden absolute bottom-10 right-8 w-12 h-12 bg-white/10 rounded-full blur-md"></div>

                        <div
                          className={`inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r ${slide.gradient} p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit shadow-lg relative overflow-hidden`}
                        >
                          {/* Mobile-only shimmer effect */}
                          <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse pointer-events-none"></div>
                          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white relative z-10" />
                          <span className="text-white font-semibold text-sm sm:text-base relative z-10">
                            {slide.subtitle}
                          </span>
                        </div>

                        <div className="relative">
                          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight relative z-10">
                            {slide.title}
                          </h1>
                          {/* Mobile-only text decoration */}
                          <div className="lg:hidden absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-current to-transparent opacity-30 rounded-full"></div>
                        </div>

                        <p className="text-base sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed relative z-10">
                          {slide.description}
                        </p>

                        {/* Enhanced mobile stats section */}
                        <div className="lg:hidden bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div
                                className={`text-3xl font-bold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                              >
                                {slide.stats.number}
                              </div>
                              <div className="text-sm text-gray-600">
                                {slide.stats.label}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <div className="w-2 h-8 bg-gradient-to-t from-gray-300 to-gray-400 rounded-full"></div>
                              <div className="w-2 h-12 bg-gradient-to-t from-gray-400 to-gray-500 rounded-full"></div>
                              <div
                                className={`w-2 h-16 bg-gradient-to-t ${slide.gradient} rounded-full shadow-lg`}
                              ></div>
                              <div className="w-2 h-10 bg-gradient-to-t from-gray-300 to-gray-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
                          <Link
                            href={slide.href}
                            className={`bg-gradient-to-r ${slide.gradient} text-white px-6 sm:px-6 py-3 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 w-fit relative overflow-hidden group`}
                          >
                            {/* Mobile-only button enhancement */}
                            <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative z-10">Get Started</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>

                          {/* Desktop stats - hidden on mobile since we have the enhanced version above */}
                          <div className="hidden lg:block text-left sm:text-center">
                            <div
                              className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                            >
                              {slide.stats.number}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {slide.stats.label}
                            </div>
                          </div>
                        </div>

                        {/* Mobile-only feature highlights */}
                        <div className="lg:hidden flex flex-wrap gap-2 mt-4">
                          {slide.features
                            .slice(0, 3)
                            .map((feature: string, idx: number) => (
                              <div
                                key={idx}
                                className="bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 border border-white/40"
                              >
                                {feature}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Right Content - Hidden on mobile */}
                      <div className="hidden lg:flex flex-col justify-center space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            Key Features
                          </h3>
                          <ul className="space-y-4">
                            {slide.features.map(
                              (feature: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-center space-x-3"
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${slide.gradient}`}
                                  />
                                  <span className="text-gray-700">
                                    {feature}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        {/* Decorative Elements */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                            <Star
                              className={`w-6 h-6 mx-auto mb-2 text-yellow-500`}
                            />
                            <div className="text-sm font-semibold text-gray-700">
                              Premium
                            </div>
                          </div>
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                            <Users
                              className={`w-6 h-6 mx-auto mb-2 text-blue-500`}
                            />
                            <div className="text-sm font-semibold text-gray-700">
                              Expert Team
                            </div>
                          </div>
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                            <Award
                              className={`w-6 h-6 mx-auto mb-2 text-green-500`}
                            />
                            <div className="text-sm font-semibold text-gray-700">
                              Certified
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-50">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? `bg-gradient-to-r ${slides[currentSlide].gradient} shadow-lg scale-125`
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
