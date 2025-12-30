import { Suspense } from "react";
import HomeContent from "@/components/HomeContent";
import LoadingSkeleton from "@/components/LoadingSkeleton";

// 1. Define Static Metadata for the Homepage
export const metadata = {
  title: "ShopHub | Premium E-Commerce Experience",
  description:
    "Discover the latest in electronics, accessories, and fashion with ShopHub. High-quality products, fast shipping, and secure checkout.",
  keywords: [
    "e-commerce",
    "online shopping",
    "electronics",
    "ShopHub",
    "Next.js store",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "ShopHub - Shop the Future",
    description:
      "Experience a modern shopping platform built for speed and quality.",
    url: "https://your-domain.com",
    siteName: "ShopHub",
    images: [
      {
        url: "/og-image.jpg", // Create a nice banner image in your /public folder
        width: 1200,
        height: 630,
        alt: "ShopHub Homepage Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopHub | Premium E-Commerce",
    description: "Shop the latest gadgets and accessories with ease.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
