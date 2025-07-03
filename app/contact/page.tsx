"use client";

import Footer from "@/components/root/footer";
import RootNav from "@/components/root/root-nav";
import { useActionState } from "react";
import FormAction from "../actions/contact-form-action";
import SubmitButton from "@/components/submit-button";

export default function Contact() {
  const [formState, formAction] = useActionState(FormAction, {
    type: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <RootNav> </RootNav>
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl">
              <div className="mb-6 sm:mb-8 md:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4 text-gray-800">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-white text-xs sm:text-sm"></i>
                  </div>
                  Contact Us
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Ready to start winning auctions? Get in touch with our
                  experts.
                </p>
              </div>

              <form action={formAction} className="space-y-6 sm:space-y-8">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-transparent rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-transparent rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    pattern="^\+?[0-9]{10,15}$"
                    placeholder="+919876543210"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-transparent rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your auction needs..."
                    rows={4}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-transparent rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg resize-none text-sm sm:text-base"
                  ></textarea>
                </div>

                {formState.type && (
                  <div
                    className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                      formState.type === "success"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {formState.message}
                  </div>
                )}

                <SubmitButton />
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl">
              <div className="mb-6 sm:mb-8 md:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 flex items-center gap-3 sm:gap-4 text-gray-800">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white text-xs sm:text-sm"></i>
                  </div>
                  Get In Touch
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Multiple ways to reach our expert team
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
                {/* Visit Our Office */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-6 bg-white/50 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-lg sm:text-xl shadow-lg bg-gradient-to-r from-pink-500 to-red-500 flex-shrink-0">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 text-gray-800">
                      Visit Our Office
                    </h3>
                    <a
                      href="https://maps.app.goo.gl/m82L679pELdjJeFd7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm md:text-base leading-relaxed break-words hover:text-sky-600 transition-colors"
                    >
                      1st Floor, Joshi Complex, Balsamand Road, Hisar, Haryana,
                      India 125001
                    </a>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-6 bg-white/50 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-lg sm:text-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 flex-shrink-0">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 text-gray-800">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919518644853"
                      className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 hover:text-sky-600 transition-colors block"
                    >
                      +91 95186-44853
                    </a>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-lg inline-block">
                      Available 24/7
                    </span>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-6 bg-white/50 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-lg sm:text-xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 flex-shrink-0">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 text-gray-800">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@trustgrowth.in"
                      className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 break-all hover:text-sky-600 transition-colors block"
                    >
                      info@trustgrowth.in
                    </a>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-lg inline-block">
                      Response within 2 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">
                  Follow Us
                </h3>
                <div className="flex justify-center gap-3 sm:gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-facebook-f text-sm"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-twitter text-sm"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-linkedin-in text-sm"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-instagram text-sm"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
