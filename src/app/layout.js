import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import Header from "@/components/Header";
import ShoppingCartSidebar from "@/components/ShoppingCartSidebar";
import ScrollToTop from "@/components/ScrollToTop"; // Import here
import { Suspense } from "react";

export const metadata = {
  title: "ShopHub - E-Commerce Store",
  description: "Modern e-commerce platform built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-white animate-pulse" />}>
            <Header />
          </Suspense>

          <ShoppingCartSidebar />

          <main className="min-h-screen">{children}</main>

          <footer className="bg-gray-900 text-white py-10 text-center">
            <p>© 2025 ShopHub. All rights reserved.</p>
          </footer>

          {/* ADDED HERE: Sits globally over all pages */}
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
