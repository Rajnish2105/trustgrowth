import Navbar from "@/components/auctionPage/navbar";
import Footer from "@/components/root/footer";
import AnimatedBackground from "@/components/animated-background";
import dynamic from "next/dynamic";

import ServicesSection from "@/components/auctionPage/services-section";
import AuctionSkeleton from "@/components/skeleton/auction-skeleton";
import StatsSection from "@/components/auctionPage/stats-section";
import PlatformSupport from "@/components/auctionPage/platform-support";
import ProcessFlow from "@/components/auctionPage/process-flow";
import SubscriptionTerms from "@/components/auctionPage/subscription-terms";

const HeroSection = dynamic(
  () => import("@/components/auctionPage/hero-section"),
  {
    loading: () => <AuctionSkeleton />,
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AnimatedBackground />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ProcessFlow />
        <PlatformSupport />
        <SubscriptionTerms />
      </main>
      <Footer />
    </div>
  );
}
