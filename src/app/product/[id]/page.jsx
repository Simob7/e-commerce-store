"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Search, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import Header from "@/components/Header";
import ShoppingCartSidebar from "@/components/ShoppingCartSidebar";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

export default function ProductPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === parseInt(params.id));
    setProduct(foundProduct);
  }, [params.id]);

  if (!product) {
    // Grab 3-4 random or featured products to show as "alternatives"
    const suggestions = PRODUCTS.slice(0, 4);

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
          {/* Animated Icon & Text */}
          <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-blue-600" size={40} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              We can't find that product
            </h2>
            <p className="text-gray-500 mb-8">
              The item might have been moved or is no longer available. Don't
              worry, we have plenty of other great things to show you!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => router.push("/")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                <Home size={18} />
                Back Home
              </button>
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
                <ShoppingBag size={18} />
                Browse Catalog
              </Link>
            </div>
          </div>

          {/* Smart Discovery Section */}
          <div className="w-full max-w-7xl mx-auto border-t pt-12">
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-xl font-semibold text-gray-900">
                You might like these instead
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
              {suggestions.map((p) => (
                <div
                  key={p.id}
                  className="opacity-80 hover:opacity-100 transition-opacity">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </main>

        <ShoppingCartSidebar />
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Products</span>
          </button>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Link href={"/"} className="hover:text-blue-600 cursor-pointer">
              Home
            </Link>
            <span>/</span>
            <span className="hover:text-blue-600 cursor-pointer">
              {product.category}
            </span>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </div>

      <ShoppingCartSidebar />
    </div>
  );
}
