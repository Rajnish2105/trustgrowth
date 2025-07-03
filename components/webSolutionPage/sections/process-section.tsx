"use client";

import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Settings,
  FileText,
  Lightbulb,
  Rocket,
} from "lucide-react";

const developmentProcess = [
  {
    step: "01",
    title: "Requirement Gathering",
    description: "Understand your business model and current manual work",
    icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    step: "02",
    title: "Consultation & Planning",
    description: "Suggest digital solutions and automation ideas",
    icon: <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "FREE",
  },
  {
    step: "03",
    title: "Prototype & Design",
    description: "Design UI/UX and process flow of your app or tool",
    icon: <Palette className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    step: "04",
    title: "Development & Testing",
    description: "Actual software/app building and debugging",
    icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    step: "05",
    title: "Deployment",
    description: "Launch the software on web, mobile, or local system",
    icon: <Rocket className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    step: "06",
    title: "Training & Support",
    description: "Train your team and offer after-launch support",
    icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />,
  },
];

export default function ProcessSection() {
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
          🚀 Software Development{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Process
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Our proven step-by-step approach ensures successful project delivery
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {developmentProcess.map((process, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300"
          >
            {process.badge && (
              <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-bold">
                {process.badge}
              </div>
            )}
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg md:rounded-xl font-bold text-sm md:text-lg">
                {process.step}
              </div>
              <div className="p-1.5 md:p-2 bg-gray-100 rounded-md md:rounded-lg text-gray-600">
                {process.icon}
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
              {process.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {process.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
