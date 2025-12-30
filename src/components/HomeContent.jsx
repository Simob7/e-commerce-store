"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react"; // 1. Import Suspense
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, ShoppingBag, Percent } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";

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

      <main className="section-container py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">
            {query ? `Results for "${query}"` : `${activeCategory} Products`}
          </h2>

          {!query && (
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {["All", "Electronics", "Accessories", "New"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`pill-button ${
                    activeCategory === cat
                      ? "pill-button-active"
                      : "pill-button-inactive"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state-card">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold">No items found</h3>
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 mt-4 font-bold hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
export default HomeContent;
