"use client";

import { useEffect, useState } from "react";
import {
  Gift,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function SubscriptionTerms() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("terms");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="terms" className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            📦 Subscription Terms & Conditions
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Transparent and fair terms designed to ensure your satisfaction
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* New Bidders */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-green-200 shadow-xl">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Gift className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                    👤 For New Bidders
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    (First-Time Users)
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-200">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Gift className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-gray-800 mb-1 md:mb-2">
                        Your First Auction is FREE
                      </h4>
                      <p className="text-xs md:text-sm text-gray-700">
                        No upfront payment required for your first auction
                        experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-200">
                  <div className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-gray-800 mb-1 md:mb-2">
                        Payment After Satisfaction
                      </h4>
                      <p className="text-xs md:text-sm text-gray-700">
                        If you&apos;re satisfied with our service, make the
                        payment after the auction is completed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-200">
                  <div className="flex items-start gap-2 md:gap-3">
                    <XCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-gray-800 mb-1 md:mb-2">
                        No Satisfaction, No Payment
                      </h4>
                      <p className="text-xs md:text-sm text-gray-700">
                        If not satisfied, you don&apos;t have to pay – no
                        questions asked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Returning Bidders */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    🔁 For Returning Bidders
                  </h3>
                  <p className="text-gray-600">(Existing Clients)</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <RefreshCw className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">
                        Previous Participation
                      </h4>
                      <p className="text-gray-700">
                        If you participated in a free auction and wish to
                        continue with future auctions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">
                        Clear Previous Dues First
                      </h4>
                      <p className="text-gray-700">
                        You must clear any previous dues before your next
                        auction participation is allowed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-300">
                  <p className="text-blue-800 font-medium text-center">
                    This ensures smooth service continuity for all clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              Ready to Start Your Gold Auction Journey?
            </h3>
            <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6">
              Join hundreds of satisfied clients who trust TrustGrowth for their
              auction needs
            </p>
            <Link
              href="/contact"
              className="bg-white text-amber-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Started with FREE Auction
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
