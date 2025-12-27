"use client";
import { useState } from "react";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
          {product.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm font-medium text-yellow-700">
              {product.rating}
            </span>
          </div>
          <span className="text-gray-400 text-sm">|</span>
          <span className="text-gray-500 text-sm">128 Reviews</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-xl text-gray-400 line-through">
            ${(product.price * 1.3).toFixed(2)}
          </span>
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
            SAVE 30%
          </span>
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-50">
              -
            </button>
            <span className="px-4 font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-50">
              +
            </button>
          </div>
          <button
            onClick={() => addToCart({ ...product, quantity })}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-200">
            <ShoppingCart size={20} />
            Add to Cart
          </button>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Truck className="text-blue-600" size={20} />
          <span>Free Delivery</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <ShieldCheck className="text-blue-600" size={20} />
          <span>2 Year Warranty</span>
        </div>
      </div>
    </div>
  );
}
