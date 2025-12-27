import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import Header from "@/components/Header";
import ShoppingCartSidebar from "@/components/ShoppingCartSidebar"; // Assuming this is your sidebar
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
          {/* 1. Header is now global and sits above all pages */}
          <Suspense fallback={<div className="h-20 bg-white animate-pulse" />}>
            <Header />
          </Suspense>

          {/* 2. The Sidebar needs to be here to open from any page */}
          <ShoppingCartSidebar />

          {/* 3. Your page content renders here */}
          <main className="min-h-screen">{children}</main>

          {/* You could also add a global Footer here */}
          <footer className="bg-gray-900 text-white py-10 text-center">
            <p>© 2025 ShopHub. All rights reserved.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
