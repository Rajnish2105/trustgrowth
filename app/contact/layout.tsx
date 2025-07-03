// Contact Page Layout and Metadata
export const metadata = {
  title: "Contact Us | Trust Growth",
  description:
    "Get in touch with Trust Growth for expert support in web development, stock market insights, and auction bidding. Reach us by phone, email, or visit our office. We're here to help you grow.",
  openGraph: {
    title: "Contact Us | Trust Growth",
    description:
      "Get in touch with Trust Growth for expert support in web development, stock market insights, and auction bidding. Reach us by phone, email, or visit our office. We're here to help you grow.",
    url: "https://trustgrowth.in/contact",
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
    title: "Contact Us | Trust Growth",
    description:
      "Get in touch with Trust Growth for expert support in web development, stock market insights, and auction bidding. Reach us by phone, email, or visit our office. We're here to help you grow.",
    images: ["/images/logo.png"],
    creator: "@trustgrowth",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
