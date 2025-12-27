// app/product/[id]/not-found.js
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingBag size={48} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
      <p className="text-gray-500 mt-2 mb-8 max-w-sm">
        Sorry, the product you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
        Back to Shopping
      </Link>
    </div>
  );
}
