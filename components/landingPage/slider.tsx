import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Users, Award } from "lucide-react";

interface SliderProps {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  slides: any[];
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
  }, [isScrolling, slides.length]);

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
  }, [isScrolling, slides.length]);

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
              <div className="flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 pt-20">
                <div
                  className={`w-full max-w-7xl mx-auto h-[80vh] rounded-3xl bg-gradient-to-br ${slide.bgGradient} backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden`}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-10`}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="grid lg:grid-cols-2 gap-12 w-full p-8 md:p-12">
                      {/* Left Content */}
                      <div className="flex flex-col justify-center space-y-6">
                        <div
                          className={`inline-flex items-center space-x-3 bg-gradient-to-r ${slide.gradient} p-4 rounded-2xl w-fit shadow-lg`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                          <span className="text-white font-semibold">
                            {slide.subtitle}
                          </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                          {slide.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                          {slide.description}
                        </p>

                        <div className="flex items-center space-x-6">
                          <Link
                            href={slide.href}
                            className={`bg-gradient-to-r ${slide.gradient} text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2`}
                          >
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5" />
                          </Link>

                          <div className="text-center">
                            <div
                              className={`text-3xl font-bold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                            >
                              {slide.stats.number}
                            </div>
                            <div className="text-sm text-gray-600">
                              {slide.stats.label}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="flex flex-col justify-center space-y-6">
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
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
