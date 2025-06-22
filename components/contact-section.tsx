"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

const contactInfo = [
  {
    icon: "fas fa-map-marker-alt",
    title: "Visit Our Office",
    content: "1st Floor, Joshi Complex, Balsamand Road, Hisar, Haryana, India 125001",
    gradient: "from-pink-500 to-red-500",
  },
  {
    icon: "fas fa-phone",
    title: "Call Us",
    content: "+91 95186-44853",
    badge: "Available 24/7",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: "fas fa-envelope",
    title: "Email Us",
    content: "info@trustgrowth.in",
    badge: "Response within 2 hours",
    gradient: "from-purple-500 to-purple-700",
  },
]

export default function ContactSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-4 text-gray-800">
                <i className="fas fa-envelope text-purple-600"></i>
                Contact Us
              </h2>
              <p className="text-gray-600 text-lg">Ready to start winning auctions? Get in touch with our experts.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  placeholder="Tell us about your auction needs..."
                  rows={5}
                  required
                  className="w-full px-5 py-4 border-2 border-transparent rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 outline-none focus:border-purple-500 focus:bg-white focus:shadow-lg resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-4 text-gray-800">
                <i className="fas fa-map-marker-alt text-purple-600"></i>
                Get In Touch
              </h2>
              <p className="text-gray-600 text-lg">Multiple ways to reach our expert team</p>
            </div>

            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`flex items-start gap-5 p-6 bg-white/50 rounded-2xl transition-all duration-700 hover:bg-white/80 hover:-translate-y-1 ${
                    visibleCards[index] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`w-15 h-15 rounded-full flex items-center justify-center text-white text-xl shadow-lg bg-gradient-to-r ${info.gradient}`}
                  >
                    <i className={info.icon}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800">{info.title}</h3>
                    <p className="text-gray-600 mb-2">{info.content}</p>
                    {info.badge && (
                      <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-lg">
                        {info.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Follow Us</h3>
              <div className="flex justify-center gap-4">
                {["facebook-f", "twitter", "linkedin-in", "instagram"].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-800 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
