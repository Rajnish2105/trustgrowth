import type React from "react";
import Footer from "@/components/footer";

export default function StockMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
