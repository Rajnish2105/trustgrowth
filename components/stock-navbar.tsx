"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RootNav from "./root/root-nav";
import { SignedOut, UserButton, SignInButton, SignedIn } from "@clerk/nextjs";

export default function StockNavbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/stockMarket" },
    { name: "Calls", href: "/stockMarket/call" },
    { name: "Pricing", href: "/stockMarket/pricing" },
    { name: "Past Results", href: "/stockMarket/past_result" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <RootNav className="justify-end">
      {/* Navigation Links */}
      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`font-medium transition-colors relative group ${
              pathname === item.href
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {item.name}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-300 ${
                pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}
      </div>

      {/* Sign In Button */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-4 md:mt-0">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </RootNav>
  );
}
