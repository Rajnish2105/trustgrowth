import Footer from "@/components/footer";
import LandingNavbarSkeleton from "@/components/skeleton/landing-navbar-skeleton";
import WebSolutionsSkeleton from "@/components/skeleton/web-solution-skeleton";
import dynamic from "next/dynamic";

const Section = dynamic(() => import("@/components/webSolutionPage/section"), {
  loading: () => <WebSolutionsSkeleton />,
});
const LandingNavbar = dynamic(
  () => import("@/components/landingPage/landing-navbar"),
  {
    loading: () => <LandingNavbarSkeleton />,
  }
);

// Web Solutions Page Metadata
export const metadata = {
  title: "Trust Growth | Website Development & Digital Solutions",
  description:
    "Discover premium website development and digital solutions with Trust Growth. We build custom, responsive, and SEO-optimized websites to help your business thrive online.",
  openGraph: {
    title: "Trust Growth | Website Development & Digital Solutions",
    description:
      "Discover premium website development and digital solutions with Trust Growth. We build custom, responsive, and SEO-optimized websites to help your business thrive online.",
    url: "https://trustgrowth.com/webSolutions",
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
    title: "Trust Growth | Website Development & Digital Solutions",
    description:
      "Discover premium website development and digital solutions with Trust Growth. We build custom, responsive, and SEO-optimized websites to help your business thrive online.",
    images: ["/images/logo.png"],
    creator: "@trustgrowth",
  },
};

export default function WebSolutions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <LandingNavbar />
      <Section />
      <Footer />
    </div>
  );
}
