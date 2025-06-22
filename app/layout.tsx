import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trustgrowth.com"),
  title: "Trust Growth | Digital Solutions, Stock Market, Auction Bidding",
  description:
    "Trust Growth offers expert-driven website development, stock market analysis, and auction bidding services. Modern, responsive, and secure digital solutions for your business.",
  generator: "v0.dev",
  openGraph: {
    title: "Trust Growth | Digital Solutions, Stock Market, Auction Bidding",
    description:
      "Trust Growth offers expert-driven website development, stock market analysis, and auction bidding services. Modern, responsive, and secure digital solutions for your business.",
    url: "https://trustgrowth.com/",
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
    title: "Trust Growth | Digital Solutions, Stock Market, Auction Bidding",
    description:
      "Trust Growth offers expert-driven website development, stock market analysis, and auction bidding services. Modern, responsive, and secure digital solutions for your business.",
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
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
        </head>
        <body
          className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
