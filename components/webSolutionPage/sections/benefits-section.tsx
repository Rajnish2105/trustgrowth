"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Shield,
  Clock,
} from "lucide-react";

const benefits = [
  {
    icon: <Target className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Industry-specific custom software",
  },
  {
    icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Free consultation for every B2B client",
  },
  {
    icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Proven automation to cut costs & manpower",
  },
  {
    icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />,
    title: "One-stop solution for web, mobile, and AI tools",
  },
  {
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
    title: "High security & scalable architecture",
  },
  {
    icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Transparent pricing and fast turnaround",
  },
];

export default function BenefitsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16 md:mb-20 lg:mb-32 px-4"
    >
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          🔥 Why Choose{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TrustGrowth Web Solutions?
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 md:gap-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="p-2 md:p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg md:rounded-xl flex-shrink-0">
              {benefit.icon}
            </div>
            <span className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg">
              {benefit.title}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
