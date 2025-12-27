"use client";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function RelatedProducts({ products }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
        <button
          onClick={() => router.push("/")}
          className="text-blue-600 hover:text-blue-700 font-semibold">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-48 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -30%
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2 min-h-[2.5rem]">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${(product.price * 1.3).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
