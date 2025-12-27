import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Zap } from "lucide-react";

export default function DealsPage() {
  // Logic: Show products where the 'old price' (fake math) is significantly higher
  // For now, let's just show products under $100 or a specific list
  const dealProducts = PRODUCTS.filter((p) => p.price < 150).slice(0, 8);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-8 mb-12 text-white flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 bg-white/20 w-fit px-3 py-1 rounded-full text-sm font-bold">
              <Zap size={16} fill="currentColor" />
              FLASH SALE
            </div>
            <h1 className="text-5xl font-black mb-4">Upto 30% OFF</h1>
            <p className="text-red-100 max-w-md">
              Grab the best tech and lifestyle products at unbeatable prices.
              Limited time only!
            </p>
          </div>
          <Zap
            size={200}
            className="absolute -right-10 text-white/10 rotate-12"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
