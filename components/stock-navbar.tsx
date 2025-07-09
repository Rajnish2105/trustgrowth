"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RootNav from "./root/root-nav";
import AuthDialog from "../components/auth-modal/auth-dialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import multiavatar from "@multiavatar/multiavatar";

export default function StockNavbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [authOpen, setAuthOpen] = useState(false);
  const svgCode = multiavatar(user?.username || "user");

  const navItems = [
    { name: "Home", href: "/stockMarket" },
    { name: "Calls", href: "/stockMarket/call" },
    { name: "Pricing", href: "/stockMarket/pricing" },
    { name: "Past Results", href: "/stockMarket/past_result" },
    { name: "Contact", href: "/contact" },
  ];

  const handleProtectedClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (
      !user &&
      (href === "/stockMarket/call" || href === "/stockMarket/past_result")
    ) {
      e.preventDefault();
      setAuthOpen(true);
    }
  };

  return (
    <RootNav className="justify-end">
      {/* Navigation Links */}
      <div className="flex md:flex-row flex-col items-center gap-2 md:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleProtectedClick(e, item.href)}
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

      {/* Sign In Button / User Info */}
      {status == "loading" ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-900"></div>
        </div>
      ) : !user ? (
        <>
          <button
            className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-4 md:mt-0"
            onClick={() => setAuthOpen(true)}
          >
            Sign in
          </button>
          <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h2 className="text-sm font-medium text-gray-900">
              {user.username}
            </h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <Link href={`/${user.username}`}>
            <span
              className="rounded-full overflow-hidden w-[40px] hover:w-[45px] transition-all duration-300 ease-in-out"
              style={{
                height: 40,
                display: "inline-block",
                boxShadow: `
                0 0 10px rgba(59, 130, 246, 0.4),
                0 0 20px rgba(59, 130, 246, 0.3),
                0 0 30px rgba(59, 130, 246, 0.2)
              `,
              }}
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </Link>
        </div>
      )}
    </RootNav>
  );
}
