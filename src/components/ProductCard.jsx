"use client";
import { useState } from "react";
import { Plus, Star, Heart, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-48 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100 object-cover"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-colors ${
            isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}>
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-lg font-semibold transition-all transform ${
              isAdding
                ? "bg-green-500 text-white scale-95"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
            }`}>
            {isAdding ? (
              <span className="flex items-center">
                <Package size={18} className="mr-1 animate-bounce" />
                Added!
              </span>
            ) : (
              <span className="flex items-center">
                <Plus size={18} className="mr-1" />
                Add
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
