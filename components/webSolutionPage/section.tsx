"use client";

import Link from "next/link";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function Section() {
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
    <section className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Web{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business with our premium web development services.
            We create stunning, high-performance websites that drive results and
            enhance your digital presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Custom Web Design",
              description: "Unique, responsive designs tailored to your brand",
              icon: "🎨",
            },
            {
              title: "E-commerce Development",
              description:
                "Powerful online stores that convert visitors to customers",
              icon: "🛒",
            },
            {
              title: "Mobile Optimization",
              description:
                "Perfect performance across all devices and screen sizes",
              icon: "📱",
            },
            {
              title: "SEO Integration",
              description:
                "Built-in optimization for better search engine rankings",
              icon: "🔍",
            },
            {
              title: "Performance Optimization",
              description:
                "Lightning-fast loading speeds and smooth user experience",
              icon: "⚡",
            },
            {
              title: "Ongoing Support",
              description:
                "24/7 maintenance and technical support for your website",
              icon: "🛠️",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Scroll Animation Section */}
        <div className="mb-20 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore some of our recent projects. Scroll to see our work
              transform before your eyes.
            </p>
          </div>

          <div
            ref={animationRef}
            className="w-full max-w-[1200px] mx-auto [perspective:1000px] [perspective-origin:center] py-16"
          >
            <div className="flex justify-center items-center relative h-[500px] [transform-style:preserve-3d]">
              <motion.div
                className="absolute w-[450px] h-[450px] border-[3px] border-gray-500 rounded-lg overflow-hidden bg-black shadow-[0_0_15px_rgba(37,99,235,0.5),inset_0_0_10px_10px_rgba(0,0,0,0.8)]"
                style={{
                  rotateY: leftRotateY,
                  translateX: leftTranslateX,
                  transformOrigin: "right center",
                }}
              >
                <div className="w-full h-full relative">
                  <iframe
                    src="https://nextlevelfood.rajnishchahar.tech"
                    title="Left Website"
                    className="w-full h-full border-none"
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute w-[400px] h-[450px] border-[3px] border-gray-500 rounded-lg overflow-hidden bg-black shadow-[0_0_15px_rgba(37,99,235,0.5),inset_0_0_10px_10px_rgba(0,0,0,0.8)]"
                style={{
                  translateZ: centerTranslateZ,
                }}
              >
                <div className="w-full h-full relative">
                  <iframe
                    src="https://cv.rajnishchahar.tech"
                    title="Center Website"
                    className="w-full h-full border-none"
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute w-[450px] h-[450px] border-[3px] border-gray-500 rounded-lg overflow-hidden bg-black shadow-[0_0_15px_rgba(37,99,235,0.5),inset_0_0_10px_10px_rgba(0,0,0,0.8)]"
                style={{
                  rotateY: rightRotateY,
                  translateX: rightTranslateX,
                  transformOrigin: "left center",
                }}
              >
                <div className="w-full h-full relative">
                  <iframe
                    src="https://nextjs.org"
                    title="Right Website"
                    className="w-full h-full border-none"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Request Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
