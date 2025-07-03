"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Phone, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12 md:mb-16 lg:mb-24 px-4"
    >
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium text-blue-700 mb-4 md:mb-6">
        <Award className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">
          Complete Digital Transformation Partner
        </span>
        <span className="sm:hidden">Digital Transformation Partner</span>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2">
        TrustGrowth{" "}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Web Solutions
        </span>
      </h1>
      <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
        Transform your business with cutting-edge technology. We build custom
        software, automate processes, and provide AI solutions that reduce costs
        by <span className="font-bold text-green-600">30-70%</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
        <Link
          href="#consultation"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
          Get Free Consultation
        </Link>
        <Link
          href="#services"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
        >
          Explore Services
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </motion.div>
  );
}
