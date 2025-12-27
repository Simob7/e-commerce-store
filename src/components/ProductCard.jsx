"use client";
import { useState } from "react";
import { Plus, Star, Heart, Package, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link"; // 1. Import Link

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // 2. Prevents the Link from triggering
    e.stopPropagation(); // 3. Prevents the click event from bubbling up
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    // 4. Wrap the entire card in a Link
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col border border-transparent hover:border-blue-100">
        {/* Image Section */}
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-48 sm:h-56 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg border border-gray-100">
                <Eye size={18} />
                View Details
              </div>
            </div>
          </div>

          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 z-20 ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}>
            <Heart
              size={18}
              className="sm:w-5 sm:h-5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>

          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            -30%
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem] flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-gray-50">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ${(product.price * 1.3).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`relative px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 z-20 ${
                isAdding
                  ? "bg-green-500 text-white"
                  : "bg-gray-900 text-white hover:bg-blue-600 shadow-md hover:shadow-blue-200"
              }`}>
              {isAdding ? (
                <span className="flex items-center text-xs sm:text-sm">
                  <Package size={16} className="mr-1 animate-bounce" />
                  Added!
                </span>
              ) : (
                <span className="flex items-center text-xs sm:text-sm">
                  <Plus size={16} className="mr-1" />
                  Add
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
