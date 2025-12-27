import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

export default function CategoryDetailPage({ params }) {
  const categoryName = params.slug;

  // Filter products by category (case-insensitive)
  const filteredProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            href="/categories"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <header className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} items in this category
            </p>
          </header>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-400">
                No products found in this category.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
