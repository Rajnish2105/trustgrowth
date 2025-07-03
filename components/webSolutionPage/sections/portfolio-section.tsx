"use client";

import Link from "next/link";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "Saanjha Prayas",
    description: "NGO platform for social impact and community engagement",
    url: "https://saanjhaprayas.com/",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Gainer Academy",
    description: "Educational platform with modern learning solutions",
    url: "https://www.gaineracademy.in/",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Next Level Food",
    description: "Modern food delivery platform with stunning UI",
    url: "https://nextlevelfood.rajnishchahar.tech",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function PortfolioSection() {
  const animationRef = useRef<HTMLDivElement>(null);

  // This will track the scroll progress of our animation container
  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start end", "end start"],
  });

  // Transform values for left panel
  const leftRotateY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 20, 20, 0] // Rotation values
  );

  const leftTranslateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, -450, -450, 0]
  );

  // Transform values for center panel
  const centerTranslateZ = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 30, 30, 0]
  );

  // Transform values for right panel
  const rightRotateY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, -20, -20, 0]
  );

  const rightTranslateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 450, 450, 0]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16 md:mb-20 lg:mb-32"
    >
      <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
          Our Amazing{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Explore some of our recent projects.
          <span className="hidden md:inline">
            {" "}
            Scroll to see our work transform before your eyes with our
            interactive 3D showcase.
          </span>
          <span className="md:hidden">
            {" "}
            Tap to visit our featured projects.
          </span>
        </p>
      </div>

      {/* Desktop 3D Animation - Your Beautiful Creation */}
      <div
        ref={animationRef}
        className="hidden md:block w-full max-w-[1200px] mx-auto [perspective:1000px] [perspective-origin:center] py-8 md:py-16 mb-8"
      >
        <div className="flex justify-center items-center relative h-[400px] md:h-[500px] [transform-style:preserve-3d]">
          <motion.div
            className="absolute w-[350px] md:w-[450px] h-[350px] md:h-[450px] border-[3px] border-blue-400/50 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(59,130,246,0.4),inset_0_0_20px_10px_rgba(0,0,0,0.8)] backdrop-blur-sm"
            style={{
              rotateY: leftRotateY,
              translateX: leftTranslateX,
              transformOrigin: "right center",
            }}
          >
            <div className="w-full h-full relative">
              <iframe
                src="https://saanjhaprayas.com/"
                title="Saanjha Prayas - NGO Platform"
                className="w-full h-full border-none"
              />
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-black/80 backdrop-blur-md rounded-lg p-2 md:p-3 text-white">
                <h3 className="font-bold text-xs md:text-sm">Saanjha Prayas</h3>
                <p className="text-xs opacity-80">NGO Platform</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute w-[300px] md:w-[400px] h-[350px] md:h-[450px] border-[3px] border-purple-400/50 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(147,51,234,0.4),inset_0_0_20px_10px_rgba(0,0,0,0.8)] backdrop-blur-sm z-10"
            style={{
              translateZ: centerTranslateZ,
            }}
          >
            <div className="w-full h-full relative">
              <iframe
                src="https://www.gaineracademy.in/"
                title="Gainer Academy - Educational Platform"
                className="w-full h-full border-none"
              />
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-black/80 backdrop-blur-md rounded-lg p-2 md:p-3 text-white">
                <h3 className="font-bold text-xs md:text-sm">Gainer Academy</h3>
                <p className="text-xs opacity-80">Educational Platform</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute w-[350px] md:w-[450px] h-[350px] md:h-[450px] border-[3px] border-orange-400/50 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(249,115,22,0.4),inset_0_0_20px_10px_rgba(0,0,0,0.8)] backdrop-blur-sm"
            style={{
              rotateY: rightRotateY,
              translateX: rightTranslateX,
              transformOrigin: "left center",
            }}
          >
            <div className="w-full h-full relative">
              <iframe
                src="https://nextlevelfood.rajnishchahar.tech"
                title="Next Level Food - Food Delivery Platform"
                className="w-full h-full border-none"
              />
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-black/80 backdrop-blur-md rounded-lg p-2 md:p-3 text-white">
                <h3 className="font-bold text-xs md:text-sm">
                  Next Level Food
                </h3>
                <p className="text-xs opacity-80">Food Delivery Platform</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Portfolio Cards - Shown only on Mobile */}
      <div className="md:hidden grid gap-4 px-4">
        {portfolioItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl p-4 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center`}
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 text-sm text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                Visit Project →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
