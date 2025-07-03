import Link from "next/link";
import StockNavbar from "@/components/stock-navbar";

export const metadata = {
  title: "Stock Market Calls | Trust Growth",
  description:
    "Get real-time, expert-driven stock market calls and recommendations from Trust Growth. Maximize your returns with our data-backed investment strategies.",
  openGraph: {
    title: "Stock Market Calls | Trust Growth",
    description:
      "Get real-time, expert-driven stock market calls and recommendations from Trust Growth. Maximize your returns with our data-backed investment strategies.",
    url: "https://trustgrowth.in/stockMarket/call",
    siteName: "Trust Growth",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Trust Growth Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Market Calls | Trust Growth",
    description:
      "Get real-time, expert-driven stock market calls and recommendations from Trust Growth. Maximize your returns with our data-backed investment strategies.",
    images: ["/images/logo.png"],
    creator: "@trustgrowth",
  },
};

export default async function StockMarketCall() {
  return (
    <div>
      <StockNavbar />
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Investment{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                Calls
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Unlock superior returns with our strategic, data-driven stock
              investment calls. Get real-time stock recommendations from our
              expert analysts.
            </p>
          </div>
        </div>
      </section>

      {/* Live Calls Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
            Today&apos;s Live Calls
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {[
              {
                stock: "RELIANCE",
                action: "BUY",
                price: "2,456.75",
                target: "2,580.00",
                stopLoss: "2,380.00",
                time: "10:30 AM",
                status: "Active",
                reason: "Strong technical breakout with increasing volume",
              },
              {
                stock: "TCS",
                action: "BUY",
                price: "3,234.50",
                target: "3,400.00",
                stopLoss: "3,150.00",
                time: "11:15 AM",
                status: "Target Hit",
                reason: "Positive Q2 results and bullish sector outlook",
              },
              {
                stock: "HDFC BANK",
                action: "SELL",
                price: "1,567.25",
                target: "1,480.00",
                stopLoss: "1,620.00",
                time: "02:45 PM",
                status: "Active",
                reason: "Bearish pattern formation with resistance at 1,600",
              },
            ].map((call, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`h-1 ${
                    call.action === "BUY"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                      : "bg-gradient-to-r from-red-500 to-red-600"
                  }`}
                ></div>
                <div className="p-4 sm:p-6">
                  {/* Mobile-first layout */}
                  <div className="space-y-4">
                    {/* Header with action and stock */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium ${
                            call.action === "BUY"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {call.action}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                            {call.stock}
                          </h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Entry
                        </p>
                        <p className="text-sm sm:text-base font-medium text-gray-800">
                          ₹{call.price}
                        </p>
                      </div>
                    </div>

                    {/* Stats grid - optimized for mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Target</p>
                        <p className="text-sm font-medium text-emerald-600">
                          ₹{call.target}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Stop Loss</p>
                        <p className="text-sm font-medium text-red-600">
                          ₹{call.stopLoss}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="text-sm font-medium text-gray-800">
                          {call.time}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p
                          className={`text-sm font-medium ${
                            call.status === "Target Hit"
                              ? "text-emerald-600"
                              : "text-blue-600"
                          }`}
                        >
                          {call.status}
                        </p>
                      </div>
                    </div>

                    {/* Reason section */}
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">Reason:</span>{" "}
                        {call.reason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call Types */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            Our Call Categories
          </h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Intraday Calls",
                description: "Quick profit opportunities for same-day trading",
                icon: "⚡",
                features: [
                  "5-10 calls per day",
                  "High accuracy",
                  "Quick profits",
                  "Detailed analysis",
                ],
                color: "from-emerald-500 to-emerald-600",
              },
              {
                title: "Swing Calls",
                description: "Medium-term positions for 3-7 days holding",
                icon: "📈",
                features: [
                  "2-3 calls per week",
                  "Higher targets",
                  "Less monitoring",
                  "Trend-based analysis",
                ],
                color: "from-sky-500 to-sky-600",
              },
              {
                title: "Investment Calls",
                description: "Long-term wealth creation opportunities",
                icon: "💎",
                features: [
                  "Monthly picks",
                  "Fundamental analysis",
                  "Wealth building",
                  "Research-backed selections",
                ],
                color: "from-emerald-500 to-sky-500",
              },
            ].map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <div className="p-6 sm:p-8 text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    {type.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 justify-center"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Calls Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Why Our Calls Stand Out
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-2">
              Our investment calls are backed by thorough research, technical
              analysis, and market expertise
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Data-Driven",
                description:
                  "All calls based on comprehensive data analysis and market patterns",
                icon: "📊",
              },
              {
                title: "Expert Analysis",
                description:
                  "Seasoned analysts with years of market experience",
                icon: "👨‍💼",
              },
              {
                title: "Clear Reasoning",
                description:
                  "Detailed explanation for every call with entry and exit points",
                icon: "🔍",
              },
              {
                title: "Proven Track Record",
                description:
                  "Consistent performance with documented success rate",
                icon: "📝",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-emerald-500 to-sky-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Get Premium Call Access
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 px-2">
            Subscribe now and never miss a profitable opportunity
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/stockMarket/pricing"
              className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              View Pricing Plans
            </Link>
            <Link
              href="/stockMarket/past_result"
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              See Past Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
