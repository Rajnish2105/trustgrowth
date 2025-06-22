"use client";

import { type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function RootNav({
  children,
  className = "justify-evenly",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClassName = isScrolled
    ? "bg-transparent backdrop-blur-md shadow-sm"
    : "bg-white/10 backdrop-blur-md border-b border-white/20";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`fixed top-0 w-full z-50 ${navClassName}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src="/images/logo.png"
                alt="Trust Growth Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trust Growth
              </h1>
              <p className="text-sm text-gray-800 font-serif italic -mt-1">
                Growth with Trust
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex w-[64%] ${className} items-center gap-8`}
          >
            {children}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 flex flex-col items-center">
            {children}
          </div>
        )}
      </div>
    </nav>
  );
}
