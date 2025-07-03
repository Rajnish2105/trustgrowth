"use client";

import Link from "next/link";
import RootNav from "../root/root-nav";

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Dynamic nav class based on scroll position - keeping it minimal
  return (
    <RootNav className="justify-end">
      {/* Navigation Links */}
      <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8 md:mr-24">
        <button
          onClick={() => scrollToSection("home")}
          className="text-gray-800 font-medium hover:text-purple-600 transition-colors relative group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => scrollToSection("services")}
          className="text-gray-800 font-medium hover:text-purple-600 transition-colors relative group"
        >
          Services
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => scrollToSection("process")}
          className="text-gray-800 font-medium hover:text-purple-600 transition-colors relative group"
        >
          Process
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => scrollToSection("terms")}
          className="text-gray-800 font-medium hover:text-purple-600 transition-colors relative group"
        >
          Subscription
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <Link
          href="/contact"
          className="text-gray-800 font-medium hover:text-purple-600 transition-colors relative group"
        >
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </RootNav>
  );
}
