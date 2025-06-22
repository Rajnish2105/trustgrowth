import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import dynamic from "next/dynamic";
import ServicesSection from "@/components/services-section";
import AuctionSkeleton from "@/components/skeleton/auction-skeleton";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const HeroSection = dynamic(
  () => delay(2000).then(() => import("@/components/hero-section")),
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
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
