import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
import AdminPageLink from "@/components/adminPanel/admin-link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trustgrowth.in"),
  title: "Trust Growth | Grow trust with us",
  description:
    "We specialize in 'portfolio management, consultancy services market analytics, Gold Auction online bidding service, web solutions, web modification workflow, website customization' everything at one place.",
  generator: "v0.dev",
  openGraph: {
    title: "Trust Growth | Grow trust with us",
    description:
      "We specialize in 'portfolio management, consultancy services market analytics, Gold Auction online bidding service, web solutions, web modification workflow, website customization' everything at one place.",
    url: "https://trustgrowth.in/",
    siteName: "Trust Growth",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Trust Growth Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Growth | Grow trust with us",
    description:
      "We specialize in 'portfolio management, consultancy services market analytics, Gold Auction online bidding service, web solutions, web modification workflow, website customization' everything at one place.",
    images: ["/images/logo.png"],
    creator: "@trustgrowth",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <SessionWrapper>
        <body
          className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
        >
          {children}
          <AdminPageLink />
        </body>
      </SessionWrapper>
    </html>
  );
}
