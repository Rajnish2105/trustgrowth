"use client";

import Footer from "@/components/footer";
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

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-xl">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-3 flex items-center gap-4 text-gray-800">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-white text-sm"></i>
                  </div>
                  Contact Us
                </h2>
                <p className="text-gray-600 text-lg">
                  Ready to start winning auctions? Get in touch with our
                  experts.
                </p>
              </div>

              <form action={formAction} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your auction needs..."
                    rows={5}
                    required
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg resize-none"
                  ></textarea>
                </div>

                {formState.type && (
                  <div
                    className={`p-4 rounded-lg ${
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
            <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-xl">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-3 flex items-center gap-4 text-gray-800">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white text-sm"></i>
                  </div>
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg">
                  Multiple ways to reach our expert team
                </p>
              </div>

              <div className="space-y-8 mb-12">
                {/* Visit Our Office */}
                <div className="flex items-start gap-5 p-6 bg-white/50 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg bg-gradient-to-r from-pink-500 to-red-500 flex-shrink-0">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800">
                      Visit Our Office
                    </h3>
                    <p className="text-gray-600 mb-2">
                      1st Floor, Joshi Complex, Balsamand Road, Hisar, Haryana,
                      India 125001
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-5 p-6 bg-white/50 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 flex-shrink-0">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800">
                      Call Us
                    </h3>
                    <p className="text-gray-600 mb-2">+91 95186-44853</p>
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-lg">
                      Available 24/7
                    </span>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-5 p-6 bg-white/50 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 flex-shrink-0">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800">
                      Email Us
                    </h3>
                    <p className="text-gray-600 mb-2">info@trustgrowth.in</p>
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-lg">
                      Response within 2 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Follow Us
                </h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className="fab fa-instagram"></i>
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
