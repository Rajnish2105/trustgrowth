import Link from "next/link"
import type { ReactNode } from "react"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: ReactNode
  gradient: string
  features: string[]
}

export default function ServiceCard({ title, description, href, icon, gradient, features }: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/90 text-lg mb-6 leading-relaxed">{description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all duration-300">
            <span>Learn More</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
