"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";

export default function ConsultationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="consultation"
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white mx-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          📞 Free Business Automation Consultation
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 leading-relaxed px-2">
          Want to know what you can automate or digitalize in your business?
          <br className="hidden sm:block" />
          Our team will analyze your needs and suggest the best solutions — for
          free!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            Request a Free Call
          </Link>
          <Link
            href="mailto:contact@trustgrowth.in"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
            Email Us Directly
          </Link>
        </div>
        <div className="mt-6 md:mt-8 text-sm md:text-base lg:text-lg opacity-80">
          <p>
            💡 <strong>100% Free Analysis</strong> • No Obligations • Immediate
            Insights
          </p>
        </div>
      </div>
    </motion.div>
  );
}
