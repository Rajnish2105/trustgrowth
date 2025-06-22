"use client";

import { useState } from "react";
import { Code, TrendingUp, Gavel } from "lucide-react";
import dynamic from "next/dynamic";
import LandingNavbarSkeleton from "@/components/skeleton/landing-navbar-skeleton";
import HomeSkeleton from "@/components/skeleton/home-skeleton";

const LandingNavbar = dynamic(
  () => import("@/components/landingPage/landing-navbar"),
  {
    ssr: false,
    loading: () => <LandingNavbarSkeleton />,
  }
);
const Slider = dynamic(() => import("@/components/landingPage/slider"), {
  ssr: false,
  loading: () => <HomeSkeleton />,
});

// Landing Page Metadata

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Website Development",
      subtitle: "Premium Digital Solutions",
      description:
        "We craft stunning, responsive websites that drive results and enhance your digital presence with cutting-edge technology.",
      href: "/webSolutions",
      gradient: "from-purple-600 via-purple-700 to-blue-600",
      bgGradient: "from-purple-900/20 via-blue-900/20 to-indigo-900/20",
      icon: Code,
      features: [
        "Custom Web Design & Development",
        "E-commerce Solutions",
        "Mobile-Responsive Design",
        "SEO Optimization",
        "24/7 Support & Maintenance",
      ],
      stats: { number: "500+", label: "Websites Built" },
    },
    {
      id: 1,
      title: "Stock Market",
      subtitle: "Expert Market Analysis",
      description:
        "Get profitable investment strategies with our expert insights, real-time analysis, and proven track record in market predictions.",
      href: "/stockMarket",
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      bgGradient: "from-green-900/20 via-emerald-900/20 to-teal-900/20",
      icon: TrendingUp,
      features: [
        "Expert Market Analysis",
        "Real-time Investment Calls",
        "Risk Management Strategies",
        "Portfolio Optimization",
        "Educational Resources",
      ],
      stats: { number: "89%", label: "Success Rate" },
    },
    {
      id: 2,
      title: "Auction Bidding",
      subtitle: "Professional Bidding Experts",
      description:
        "Win more auctions with our cutting-edge bidding techniques and professional team of auction specialists.",
      href: "/auction",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      bgGradient: "from-orange-900/20 via-red-900/20 to-pink-900/20",
      icon: Gavel,
      features: [
        "Professional Bidding Experts",
        "Market Analysis & Strategy",
        "Secure Bidding Process",
        "89% Success Rate",
        "24/7 Auction Support",
      ],
      stats: { number: "24/7", label: "Support Available" },
    },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      <LandingNavbar
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
      <Slider
        slides={slides}
        setCurrentSlide={setCurrentSlide}
        currentSlide={currentSlide}
      />
    </div>
  );
}
