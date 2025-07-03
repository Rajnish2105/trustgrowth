"use client";

import { motion } from "framer-motion";
import { Globe, Database, Bot, Zap, Users, CheckCircle } from "lucide-react";

const services = [
  {
    title: "Website & App Development",
    icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Responsive websites (HTML/CSS/JS/PHP/WordPress)",
      "Android/iOS/Hybrid mobile apps",
      "E-commerce, portfolio, business, or ERP systems",
    ],
  },
  {
    title: "Web Scraping & Data Collection",
    icon: <Database className="w-6 h-6 md:w-8 md:h-8" />,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Structured web data extraction",
      "Price monitoring, competitor research",
      "Scrapers in Python, PHP, Node.js",
    ],
  },
  {
    title: "AI for Business Automation",
    icon: <Bot className="w-6 h-6 md:w-8 md:h-8" />,
    gradient: "from-purple-500 to-violet-500",
    features: [
      "Chatbots, invoice scanning, smart ticketing",
      "Integrate AI into CRM, ERP, or custom workflows",
      "Reduce manpower by 30-70% with automation",
    ],
  },
  {
    title: "Repetitive Task Automation",
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Email and report automation",
      "Excel/Google Sheets automation",
      "Workflow bots and robotic process automation (RPA)",
    ],
  },
  {
    title: "Digital Business Consultancy",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    gradient: "from-pink-500 to-rose-500",
    badge: "FREE",
    features: [
      "Analyze your operations and suggest improvements",
      "What to automate & digitalize",
      "Where to save cost - 100% free for B2B clients",
    ],
  },
];

export default function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="services"
      className="mb-16 md:mb-20 lg:mb-32 px-4"
    >
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          🛠 Detailed{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Each service is designed to transform your business operations and
          drive growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {service.badge && (
              <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                {service.badge}
              </div>
            )}
            <div
              className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${service.gradient} text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              {service.icon}
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors">
              {service.title}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {service.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-start gap-2 md:gap-3 text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
