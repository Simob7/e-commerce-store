"use client";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product }) {
  const { cart, addToCart, setIsOpen } = useCart();

  const [quantity, setQuantity] = useState(1);

  // Smart check: Is this specific product already in the cart?
  const isInCart = cart.some((item) => item.id === product.id);
  const cartItem = cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 md:space-y-8">
      {/* 1. Header Section - Dynamic Text Sizes */}
      <div className="space-y-2">
        <span className="text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
          {product?.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {product?.name}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-md">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="ml-1.5 text-sm font-bold text-yellow-700">
              {product?.rating}
            </span>
          </div>
          <span className="text-gray-300 hidden sm:block">/</span>
          <span className="text-xs sm:text-sm text-gray-500 font-medium underline underline-offset-4 cursor-pointer hover:text-gray-900">
            128 customer reviews
          </span>
        </div>
      </div>

      {/* 2. Pricing & Description */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl md:text-4xl font-black text-gray-900">
            ${product?.price}
          </span>
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-xs md:text-sm">
              ${(product?.price * 1.3).toFixed(2)}
            </span>
            <span className="text-red-500 text-[10px] md:text-xs font-bold uppercase">
              Save 30%
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-lg">
          {product?.description}
        </p>
      </div>

      {/* 3. Interactive Actions - Stack on Mobile, Row on Tablet/Desktop */}
      <div className="flex flex-col gap-4">
        {/* Container stacks vertically on tiny screens, horizontal on 'sm' and up */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
          {/* Quantity Pill - Full width on Mobile */}
          <div className="flex items-center justify-between sm:justify-start bg-gray-100 rounded-2xl p-1 h-[52px] md:h-[56px] border border-transparent focus-within:border-gray-200 transition-all">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500">
              <Minus size={18} />
            </button>
            <span className="w-12 text-center font-bold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500">
              <Plus size={18} />
            </button>
          </div>

          <div className="flex flex-1 gap-3 items-center">
            <button
              onClick={() => {
                addToCart(product);
                setIsOpen(true);
              }}
              className="flex-1 bg-gray-900 hover:bg-blue-600 text-white font-bold h-[52px] md:h-[56px] rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] relative overflow-hidden group">
              <ShoppingCart size={18} />
              <span>{isInCart ? "Add Another" : "Add to Cart"}</span>

              {/* Small badge inside the button */}
              {isInCart && (
                <span className="absolute top-2 right-2 bg-white text-gray-900 text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartItem.quantity}
                </span>
              )}
            </button>

            <button className="h-[52px] w-[52px] md:h-[56px] md:w-[56px] flex-shrink-0 flex items-center justify-center border-2 border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-red-100 hover:text-red-500 transition-all group">
              <Heart size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Trust Badges - Stack on Mobile, Grid on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-100">
        <div className="flex items-center sm:items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Truck size={18} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-bold text-gray-900">
              Free Delivery
            </p>
            <p className="text-[10px] md:text-xs text-gray-500">
              Orders over $50
            </p>
          </div>
        </div>
        <div className="flex items-center sm:items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-bold text-gray-900">
              Secure Warranty
            </p>
            <p className="text-[10px] md:text-xs text-gray-500">
              2 years protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
