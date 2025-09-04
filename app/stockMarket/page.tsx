"use client";

import Disclaimer from "@/components/root/disclamer";
import Image from "next/image";
import Link from "next/link";

export default function StockMarketHome() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                We promise to bring the best{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                  Stock Market Investment Calls
                </span>{" "}
                for you.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-4 sm:mt-6 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Welcome to Trust Growth: Let&apos;s make profit with us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
              >
                CONTACT US
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative order-1 lg:order-2">
              <Image
                src="/images/hero.jpg"
                alt="Stock Market Analysis"
                width={500}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto max-w-md sm:max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/images/hero2.jpg"
                alt="Investment Consultancy"
                width={500}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto max-w-md sm:max-w-lg mx-auto"
              />
            </div>
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Welcome to Trust Growth Investment Consultancy
              </h2>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Welcome to Trust Growth, your trusted partner for expert
                investment consultancy in the stock market. Our team of seasoned
                professionals is dedicated to helping you achieve your financial
                goals with precision and expertise.
              </p>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                With Trust Growth, you can trust in our commitment to guiding
                you towards growth and success in the dynamic world of stock
                market investments. Experience the difference of personalized
                service and expert insights with Trust Growth today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Explore The Services We Offer For You
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-sm sm:text-base leading-relaxed px-4">
              Welcome to Trust Growth, your premier destination for expert
              investment consultancy in the stock market. We specialize in
              portfolio management, consultancy services, investment calls, and
              market analytics, tailored to optimize your financial success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Portfolio Management",
                description:
                  "Optimize your stock investments with our portfolio management services.",
                icon: "📊",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                title: "Market Analytics",
                description:
                  "Market analytics by seasoned experts. Technical and fundamental researchers offering insights.",
                icon: "📈",
                color: "from-sky-500 to-sky-600",
              },
              {
                title: "Calls",
                description:
                  "Unlock superior returns with our strategic, data-driven stock investment calls.",
                icon: "📱",
                color: "from-emerald-500 to-sky-500",
              },
              {
                title: "Profit Growth",
                description:
                  "Consistent profit growth ensured with our strategic investment calls for stocks.",
                icon: "💰",
                color: "from-green-500 to-emerald-600",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Why Choose Trust Growth
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-sm sm:text-base leading-relaxed px-4">
              We combine expertise, technology, and personalized service to
              deliver exceptional results for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Quality Results",
                description:
                  "We are backboned and knowledgeable for market analysis, many times and we'll show some portfolios that we managed. Consistent gain and results.",
                icon: "🏆",
              },
              {
                title: "Market Analytics",
                description:
                  "We'll provide you calls with proper Market analysis technical and fundamental analytics with reason to invest in our given stocks.",
                icon: "📊",
              },
              {
                title: "Affordable Pricing",
                description:
                  "Affordable pricing after 45 days free trial don't worry we are here to help all investors in Stock Market.",
                icon: "💲",
              },
              {
                title: "Easy To Use",
                description:
                  "Easy to use our service no complications easily readable data and investment calls analysis with reason.",
                icon: "👌",
              },
              {
                title: "Free Support",
                description:
                  "You can call us 10:00 am to 06:00 pm Monday to Saturday We'll help you to understand all your query.",
                icon: "🛟",
              },
              {
                title: "Effectively Increase",
                description:
                  "Grow your wealth effectively with our investment strategies, designed for optimal returns and capital appreciation.",
                icon: "📈",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 text-center h-full"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
