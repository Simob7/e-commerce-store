"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react"; // 1. Import Suspense
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, ShoppingBag, Percent } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";

// 2. Wrap the dynamic content in Suspense
export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading Shop...
        </div>
      }>
      <HomeContent />
    </Suspense>
  );
}

// 3. Move your logic into this sub-component
function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("search")?.toLowerCase() || "";
  const activeCategory = searchParams.get("category") || "All";

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") params.delete("category");
    else params.set("category", category);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white">
      {!query && <HeroCarousel />}

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {query ? `Results for "${query}"` : `${activeCategory} Products`}
            </h2>
          </div>

          {!query && (
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {["All", "Electronics", "Accessories", "New"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold">No items found</h3>
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 mt-4 font-bold">
              Clear all filters
            </button>
          </div>
        )}

        {!query && (
          <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t pt-16">
            <div className="text-center">
              <ShoppingBag className="mx-auto text-blue-600 mb-2" />
              <h4 className="font-bold">Free Shipping</h4>
              <p className="text-sm text-gray-500">On orders over $100</p>
            </div>
            <div className="text-center">
              <Percent className="mx-auto text-green-600 mb-2" />
              <h4 className="font-bold">Best Prices</h4>
              <p className="text-sm text-gray-500">Guaranteed value</p>
            </div>
            <div className="text-center">
              <Sparkles className="mx-auto text-purple-600 mb-2" />
              <h4 className="font-bold">Quality Assured</h4>
              <p className="text-sm text-gray-500">100% Authentic</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
