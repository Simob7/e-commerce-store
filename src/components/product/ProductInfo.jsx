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
  const { addToCart, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsOpen(true); // Open sidebar to show the item was added
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* 1. Header Section */}
      <div className="space-y-2">
        <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
          {product.category}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-md">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="ml-1.5 text-sm font-bold text-yellow-700">
              {product.rating}
            </span>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500 font-medium underline underline-offset-4 cursor-pointer hover:text-gray-900">
            128 customer reviews
          </span>
        </div>
      </div>

      {/* 2. Pricing & Description */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-black text-gray-900">
            ${product.price}
          </span>
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-sm">
              ${(product.price * 1.3).toFixed(2)}
            </span>
            <span className="text-red-500 text-xs font-bold uppercase">
              Save 30%
            </span>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-lg">
          {product.description}
        </p>
      </div>

      {/* 3. Interactive Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Refined Quantity Pill */}
          <div className="flex items-center bg-gray-100 rounded-2xl p-1 h-[56px] border border-transparent focus-within:border-gray-200 transition-all">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500">
              <Minus size={18} />
            </button>
            <span className="w-12 text-center font-bold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500">
              <Plus size={18} />
            </button>
          </div>

          {/* Primary Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-900 hover:bg-blue-600 text-white font-bold h-[56px] rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-gray-200 hover:shadow-blue-100">
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          {/* Wishlist Toggle */}
          <button className="h-[56px] w-[56px] flex items-center justify-center border-2 border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-red-100 hover:text-red-500 transition-all group">
            <Heart size={22} className="group-active:fill-red-500" />
          </button>
        </div>
      </div>

      {/* 4. Trust Badges */}
      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Free Delivery</p>
            <p className="text-xs text-gray-500">Orders over $50</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Secure Warranty</p>
            <p className="text-xs text-gray-500">2 years protection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
