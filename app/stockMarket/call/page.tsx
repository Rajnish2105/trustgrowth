import Link from "next/link";
import { db } from "@/lib/db";

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
  const liveCalls = await db.calls.findMany({
    where: {
      NOT: { action: "SELL" },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <div>
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
            {liveCalls.map((c, index) => {
              const entry = Number(c.entry ?? 0);
              const stopLoss = Number(c.stoploss ?? 0);
              const targetPrice = entry * (1 + Number(c.minTarget ?? 0) / 100);
              const createdTime = new Date(c.createdAt).toLocaleString(
                "en-IN",
                {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              const updatedTime = new Date(c.updatedAt).toLocaleString(
                "en-IN",
                {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              const status = c.exit ? "Closed" : "Active";
              const hasReturn = c.return && c.return !== "0";

              const getActionColor = (action: string) => {
                switch (action) {
                  case "BUY":
                    return "bg-emerald-100 text-emerald-700";
                  case "SELL":
                    return "bg-red-100 text-red-700";
                  case "WATCH":
                    return "bg-blue-100 text-blue-700";
                  case "HOLD":
                    return "bg-yellow-100 text-yellow-700";
                  default:
                    return "bg-gray-100 text-gray-700";
                }
              };

              const getActionGradient = (action: string) => {
                switch (action) {
                  case "BUY":
                    return "bg-gradient-to-r from-emerald-500 to-emerald-600";
                  case "SELL":
                    return "bg-gradient-to-r from-red-500 to-red-600";
                  case "WATCH":
                    return "bg-gradient-to-r from-blue-500 to-blue-600";
                  case "HOLD":
                    return "bg-gradient-to-r from-yellow-500 to-yellow-600";
                  default:
                    return "bg-gradient-to-r from-gray-500 to-gray-600";
                }
              };

              const getStatusPillClass = (statusValue: string) => {
                const base = "px-2 py-1 rounded-full text-xs font-medium";
                return statusValue === "Closed"
                  ? `${base} bg-emerald-100 text-emerald-700`
                  : `${base} bg-blue-100 text-blue-700`;
              };

              return (
                <Link
                  href={`call/report/${c.id}`}
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-1 ${getActionGradient(c.action)}`}></div>
                  <div className="p-4 sm:p-6">
                    {/* Mobile-first layout */}
                    <div className="space-y-4">
                      {/* Header with action and stock */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium ${getActionColor(
                              c.action
                            )}`}
                          >
                            {c.action}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                              {c.stock}
                            </h3>
                            <p className="text-xs text-gray-500">{c.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-gray-500">
                            Entry
                          </p>
                          <p className="text-sm sm:text-base font-medium text-gray-800">
                            ₹{entry.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Stats grid - optimized for mobile */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">Target</p>
                          <p className="text-sm font-medium text-emerald-600">
                            ₹{targetPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            Stop Loss
                          </p>
                          <p className="text-sm font-medium text-red-600">
                            ₹{stopLoss.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">Created</p>
                          <p className="text-sm font-medium text-gray-800">
                            {createdTime}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">Updated</p>
                          <p className="text-sm font-medium text-gray-800">
                            {updatedTime}
                          </p>
                        </div>
                      </div>

                      {/* Return display section when available */}
                      {hasReturn && (
                        <div className="bg-emerald-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">Return</p>
                          <p className="text-sm font-medium text-emerald-600">
                            {c.return}
                          </p>
                        </div>
                      )}

                      {/* Exit price display when available */}
                      {c.exit && (
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            Exit Price
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            ₹{c.exit}
                          </p>
                        </div>
                      )}

                      {/* Reason section */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium">Reason:</span> {"-"}
                        </p>
                        <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                          <span className="font-medium">Status:</span>
                          <span className={getStatusPillClass(status)}>
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
