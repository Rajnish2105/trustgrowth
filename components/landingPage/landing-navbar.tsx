"use client";

import Link from "next/link";
import RootNav from "../root/root-nav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface LandingNavbarProps {
  currentSlide?: number;
  slides?: Array<{ title: string; href: string; gradient: string }>;
}

export default function LandingNavbar({
  currentSlide = 0,
  slides = [
    {
      title: "Web Solutions",
      href: "/webSolutions",
      gradient: "from-purple-600 via-purple-700 to-blue-600",
    },
    {
      title: "Stock Market",
      href: "/stockMarket",
      gradient: "from-green-500 via-emerald-600 to-teal-600",
    },
    {
      title: "Auction Services",
      href: "/auction",
      gradient: "from-orange-500 via-red-500 to-pink-600",
    },
  ],
}: LandingNavbarProps) {
  return (
    <RootNav className="justify-between">
      {/* Navigation Links */}
      <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8">
        {slides.map((slide, index) => (
          <Link
            key={index}
            href={slide.href}
            className={`font-medium transition-all duration-300 relative group ${
              index === currentSlide
                ? `text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient}`
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            {slide.title}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                index === currentSlide
                  ? `w-full bg-gradient-to-r ${slide.gradient}`
                  : "w-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </div>

      {/* Sign In Button */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-4 md:mt-0">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* Auth Dialog will be rendered by the parent component (e.g., layout.tsx) */}
    </RootNav>
  );
}
