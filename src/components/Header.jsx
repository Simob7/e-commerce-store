"use client";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";

export default function Header() {
  const { setIsOpen, cartCount, isHydrated } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();

  // Navigation Links Data
  const navLinks = [
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (localQuery.trim().length > 0) {
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(localQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(localQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [localQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(localQuery.trim())}`);
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-8">
          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-2xl">🛍️</div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              ShopHub
            </h1>
          </Link>

          {/* 2. DESKTOP NAVIGATION - Visible only on md (768px) and up */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. Search Bar (Hidden on mobile by default, shows in popup) */}
          <div
            className="hidden md:block flex-1 max-w-sm relative"
            ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              />
            </form>

            {/* Live Search Results Popup */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setSearchResults([]);
                        setLocalQuery("");
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-xl transition-colors group">
                      <div className="relative w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <p className="text-xs font-semibold text-gray-900 truncate flex-1">
                        {product.name}
                      </p>
                      <ArrowRight size={12} className="text-gray-300" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Search size={22} />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 sm:p-3 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md">
              <ShoppingCart size={20} />
              {isHydrated && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              />
            </form>
          </div>
        )}

        {/* MOBILE DRAWER LINKS */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-2 animate-in fade-in duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
