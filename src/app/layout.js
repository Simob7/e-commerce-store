import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "ShopHub - E-Commerce Store",
  description: "Modern e-commerce platform built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
