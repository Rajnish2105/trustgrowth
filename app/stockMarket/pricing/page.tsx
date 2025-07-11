import FreeTrialButton from "@/components/stockMarket/free-trail-button";
import StockNavbar from "@/components/stock-navbar";
import ChoosePlanButton from "@/components/stockMarket/choose-plan-button";
export const metadata = {
  title: "Stock Market Pricing | Trust Growth",
  description:
    "Explore flexible pricing plans for Trust Growth's stock market advisory services. Choose the best plan for your investment needs and start your free trial today!",
  openGraph: {
    title: "Stock Market Pricing | Trust Growth",
    description:
      "Explore flexible pricing plans for Trust Growth's stock market advisory services. Choose the best plan for your investment needs and start your free trial today!",
    url: "https://trustgrowth.in/stockMarket/pricing",
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
    title: "Stock Market Pricing | Trust Growth",
    description:
      "Explore flexible pricing plans for Trust Growth's stock market advisory services. Choose the best plan for your investment needs and start your free trial today!",
    images: ["/images/logo.png"],
    creator: "@trustgrowth",
  },
};

export default async function StockMarketPricing() {
  return (
    <div>
      <StockNavbar />
      {/* Free Trial Banner */}
      <section className="py-4 sm:py-6 md:py-8 bg-gradient-to-r from-emerald-500 to-sky-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-white text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl md:text-4xl">🎁</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1">
                  Start with a 45-Day Free Trial
                </h3>
                <p className="text-sm sm:text-base">
                  Experience our premium services with no commitment
                </p>
              </div>
            </div>
            <FreeTrialButton />
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Basic",
                price: "₹2,999",
                period: "/month",
                description:
                  "Perfect for beginners starting their investment journey",
                features: [
                  "Basic market analysis",
                  "WhatsApp support",
                  "Weekly market outlook",
                  "Risk management tips",
                  "Investment tips in Equity Market",
                  "Portfolio review",
                ],
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "Premium",
                price: "₹5,999",
                period: "/month",
                description: "Most popular plan for serious investors",
                features: [
                  "All Basic Plan Benefits",
                  "3 Swing calls per week",
                  "Detailed technical analysis",
                  "Priority WhatsApp support",
                  "Daily market outlook",
                  "Portfolio Management",
                ],
                color: "from-emerald-500 to-sky-500",
              },
              {
                name: "Elite",
                price: "₹9,999",
                period: "/month",
                description: "Complete solution for professional traders",
                features: [
                  "All Preimum Plan Benefits",
                  "2 Investment calls per month",
                  "Advanced technical analysis",
                  "Dedicated relationship manager",
                  "Daily market outlook",
                  "One-on-one consultation",
                ],
                color: "from-purple-500 to-purple-600",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 min-h-[2.5rem] sm:min-h-[3rem]">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        {plan.price}
                      </span>
                      <span className="text-sm sm:text-base text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base text-gray-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ChoosePlanButton plan={plan} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            What&apos;s Included in All Plans
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: "🔒",
                title: "Secure Platform",
                description: "Bank-grade security",
              },
              {
                icon: "📱",
                title: "Mobile App Support",
                description: "Whatsapp, telegram, etc",
              },
              {
                icon: "🎯",
                title: "High Accuracy",
                description: "85%+ success rate",
              },
              {
                icon: "🕒",
                title: "24/7 Support",
                description: "Round the clock help",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote:
                  "Trust Growth helped me achieve consistent profits. Their calls are incredibly accurate and well-researched.",
                name: "Ankit Sharma",
                title: "Retail Investor",
              },
              {
                quote:
                  "The detailed analysis provided by Trust Growth made me confident in my investments. Highly recommended!",
                name: "Priya Singh",
                title: "Trader",
              },
              {
                quote:
                  "Their swing calls have been a game-changer for my portfolio. Excellent support and reliable advice.",
                name: "Rahul Verma",
                title: "Long-Term Investor",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl shadow-md p-6 sm:p-8 relative"
              >
                <svg
                  className="absolute top-4 sm:top-6 left-4 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 text-emerald-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.906 14.809q0 1.488-.707 2.66-.707 1.171-1.939 1.954-1.232.783-2.738.783-1.506 0-2.738-.783-1.232-.783-1.939-1.954-.707-1.171-.707-2.66 0-1.895.969-3.238.97-1.343 2.868-2.008l.794-1.229q-1.278.431-2.274 1.127-.996.696-1.742 1.638-.747.942-1.077 2.052-.33 1.11-.33 2.298 0 1.928.91 3.298 1.096 1.683 2.87 2.524 1.774.841 3.738.841 2.072 0 3.763-.996 1.691-.996 2.868-2.671L11.906 14.809zm10.519 0q0 1.488-.707 2.66-.707 1.171-1.939 1.954-1.232.783-2.738.783-1.506 0-2.738-.783-1.232-.783-1.939-1.954-.707-1.171-.707-2.66 0-1.895.969-3.238.97-1.343 2.868-2.008l.794-1.229q-1.278.431-2.274 1.127-.996.696-1.742 1.638-.747.942-1.077 2.052-.33 1.11-.33 2.298 0 1.928.91 3.298 1.096 1.683 2.87 2.524 1.774.841 3.738.841 2.072 0 3.763-.996 1.691-.996 2.868-2.671L22.425 14.809z" />
                </svg>
                <p className="relative text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-6 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            {[
              {
                question: "What kind of calls do you provide?",
                answer:
                  "We provide Intraday, Swing, and Long-Term Investment calls across various segments of the stock market.",
              },
              {
                question: "How accurate are your calls?",
                answer:
                  "Our calls are backed by extensive research and analysis, aiming for high accuracy with a proven track record.",
              },
              {
                question: "Do you offer a free trial?",
                answer:
                  "Yes, we offer a 45-day free trial for new users to experience our premium services.",
              },
              {
                question: "How do I receive the calls and market updates?",
                answer:
                  "Calls and market updates are delivered via our dedicated WhatsApp support and through our platform.",
              },
              {
                question: "What if I need personal assistance?",
                answer:
                  "Our Elite plan includes a dedicated relationship manager and one-on-one consultation for personalized assistance.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
                tabIndex={0}
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer text-sm sm:text-base">
                    <span className="pr-4">{faq.question}</span>
                    <span className="transition group-open:rotate-180 flex-shrink-0">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
