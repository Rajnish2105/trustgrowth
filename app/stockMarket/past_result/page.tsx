import Link from "next/link";

import StockNavbar from "@/components/stock-navbar";

export const metadata = {
  title: "Stock Market Past Results | Trust Growth",
  description:
    "See the proven track record and past results of Trust Growth's stock market calls. Transparent performance metrics and consistent gains for our clients.",
  openGraph: {
    title: "Stock Market Past Results | Trust Growth",
    description:
      "See the proven track record and past results of Trust Growth's stock market calls. Transparent performance metrics and consistent gains for our clients.",
    url: "https://trustgrowth.in/stockMarket/past_result",
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
    title: "Stock Market Past Results | Trust Growth",
    description:
      "See the proven track record and past results of Trust Growth's stock market calls. Transparent performance metrics and consistent gains for our clients.",
    images: ["/images/logo.png"],
    creator: "@trustgrowth",
  },
};

export default async function StockMarketPastResults() {
  return (
    <div>
      <StockNavbar />
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Past{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                Results
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Track record of our successful calls and performance metrics.
              Consistent gain and results.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                label: "Overall Success Rate",
                value: "85.2%",
                icon: "🎯",
                color: "text-emerald-600",
              },
              {
                label: "Average Return",
                value: "12.5%",
                icon: "📈",
                color: "text-blue-600",
              },
              {
                label: "Total Calls",
                value: "2,847",
                icon: "📞",
                color: "text-purple-600",
              },
              {
                label: "Profitable Calls",
                value: "2,426",
                icon: "💰",
                color: "text-emerald-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                  {stat.icon}
                </div>
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
            Recent Call Results
          </h2>

          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-4">
            {[
              {
                stock: "RELIANCE",
                action: "BUY",
                entry: "2,456",
                exit: "2,580",
                return: "+5.05%",
                status: "Profit",
                date: "15 Dec",
              },
              {
                stock: "TCS",
                action: "BUY",
                entry: "3,234",
                exit: "3,400",
                return: "+5.13%",
                status: "Profit",
                date: "14 Dec",
              },
              {
                stock: "HDFC BANK",
                action: "SELL",
                entry: "1,567",
                exit: "1,480",
                return: "+5.55%",
                status: "Profit",
                date: "13 Dec",
              },
              {
                stock: "INFOSYS",
                action: "BUY",
                entry: "1,456",
                exit: "1,420",
                return: "-2.47%",
                status: "Loss",
                date: "12 Dec",
              },
              {
                stock: "ICICI BANK",
                action: "BUY",
                entry: "987",
                exit: "1,045",
                return: "+5.87%",
                status: "Profit",
                date: "11 Dec",
              },
              {
                stock: "WIPRO",
                action: "SELL",
                entry: "456",
                exit: "432",
                return: "+5.26%",
                status: "Profit",
                date: "10 Dec",
              },
            ].map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {result.stock}
                    </h3>
                    <p className="text-sm text-gray-500">{result.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.action === "BUY"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {result.action}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.status === "Profit"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Entry</p>
                    <p className="font-medium">₹{result.entry}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Exit</p>
                    <p className="font-medium">₹{result.exit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Return</p>
                    <p
                      className={`font-bold ${
                        result.status === "Profit"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {result.return}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Stock
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Action
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Entry
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Exit
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Return
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-gray-800">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      stock: "RELIANCE",
                      action: "BUY",
                      entry: "2,456",
                      exit: "2,580",
                      return: "+5.05%",
                      status: "Profit",
                      date: "15 Dec",
                    },
                    {
                      stock: "TCS",
                      action: "BUY",
                      entry: "3,234",
                      exit: "3,400",
                      return: "+5.13%",
                      status: "Profit",
                      date: "14 Dec",
                    },
                    {
                      stock: "HDFC BANK",
                      action: "SELL",
                      entry: "1,567",
                      exit: "1,480",
                      return: "+5.55%",
                      status: "Profit",
                      date: "13 Dec",
                    },
                    {
                      stock: "INFOSYS",
                      action: "BUY",
                      entry: "1,456",
                      exit: "1,420",
                      return: "-2.47%",
                      status: "Loss",
                      date: "12 Dec",
                    },
                    {
                      stock: "ICICI BANK",
                      action: "BUY",
                      entry: "987",
                      exit: "1,045",
                      return: "+5.87%",
                      status: "Profit",
                      date: "11 Dec",
                    },
                    {
                      stock: "WIPRO",
                      action: "SELL",
                      entry: "456",
                      exit: "432",
                      return: "+5.26%",
                      status: "Profit",
                      date: "10 Dec",
                    },
                    {
                      stock: "BHARTI AIRTEL",
                      action: "BUY",
                      entry: "876",
                      exit: "912",
                      return: "+4.11%",
                      status: "Profit",
                      date: "9 Dec",
                    },
                    {
                      stock: "TATA MOTORS",
                      action: "BUY",
                      entry: "654",
                      exit: "698",
                      return: "+6.73%",
                      status: "Profit",
                      date: "8 Dec",
                    },
                  ].map((result, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-800 text-sm lg:text-base">
                        {result.stock}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.action === "BUY"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {result.action}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600 text-sm lg:text-base">
                        ₹{result.entry}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600 text-sm lg:text-base">
                        ₹{result.exit}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span
                          className={`font-medium text-sm lg:text-base ${
                            result.status === "Profit"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {result.return}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.status === "Profit"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {result.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600 text-sm lg:text-base">
                        {result.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Performance */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
            Monthly Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                month: "December 2024",
                calls: 89,
                profitable: 76,
                success: "85.4%",
                return: "+12.8%",
              },
              {
                month: "November 2024",
                calls: 92,
                profitable: 79,
                success: "85.9%",
                return: "+14.2%",
              },
              {
                month: "October 2024",
                calls: 87,
                profitable: 73,
                success: "83.9%",
                return: "+11.5%",
              },
            ].map((month, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  {month.month}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Total Calls:
                    </span>
                    <span className="font-medium text-sm sm:text-base">
                      {month.calls}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Profitable:
                    </span>
                    <span className="font-medium text-emerald-600 text-sm sm:text-base">
                      {month.profitable}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Success Rate:
                    </span>
                    <span className="font-medium text-blue-600 text-sm sm:text-base">
                      {month.success}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Average Return:
                    </span>
                    <span className="font-medium text-emerald-600 text-sm sm:text-base">
                      {month.return}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Results Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Quality Results
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base px-4">
              We are backboned and knowledgeable for market analysis, many times
              and we&apos;ll show some portfolios that we managed. Consistent
              gain and results.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Portfolio Performance
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Conservative Portfolio",
                    return: "+18.5%",
                    period: "Last 12 months",
                  },
                  {
                    name: "Balanced Portfolio",
                    return: "+24.7%",
                    period: "Last 12 months",
                  },
                  {
                    name: "Aggressive Portfolio",
                    return: "+32.3%",
                    period: "Last 12 months",
                  },
                ].map((portfolio, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {portfolio.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {portfolio.period}
                      </p>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-emerald-600">
                      {portfolio.return}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Sector-wise Performance
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Banking & Finance",
                    return: "+21.3%",
                    period: "Last 12 months",
                  },
                  {
                    name: "IT & Technology",
                    return: "+19.8%",
                    period: "Last 12 months",
                  },
                  {
                    name: "Pharma & Healthcare",
                    return: "+26.5%",
                    period: "Last 12 months",
                  },
                  {
                    name: "Auto & Manufacturing",
                    return: "+17.9%",
                    period: "Last 12 months",
                  },
                ].map((sector, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {sector.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {sector.period}
                      </p>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-emerald-600">
                      {sector.return}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Investor",
                comment:
                  "Amazing accuracy! Made ₹2.5L profit in just 3 months with their calls.",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                role: "Trader",
                comment:
                  "Best stock advisory service. Their analysis is spot on and support is excellent.",
                rating: 5,
              },
              {
                name: "Amit Patel",
                role: "Business Owner",
                comment:
                  "Trust Growth has helped me grow my investment portfolio by 32% in one year. Highly recommended!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic text-sm sm:text-base">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-emerald-500 to-sky-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Join Our Success Story?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
            Start your profitable investment journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/stockMarket/pricing"
              className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              View Pricing Plans
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
