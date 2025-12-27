import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ChevronRight, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";

export default function CategoriesPage() {
  // Extract unique categories and count items in each
  const categoryData = PRODUCTS.reduce((acc, product) => {
    const existing = acc.find((c) => c.name === product.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        name: product.category,
        count: 1,
        image: product.image, // Use the first product's image as category thumbnail
      });
    }
    return acc;
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <LayoutGrid className="text-blue-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-900">
              Browse Categories
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((cat) => (
              <Link
                key={cat.name}
                href={`/categories/${cat.name.toLowerCase()}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">
                      {cat.name}
                    </h2>
                    <p className="text-gray-500 font-medium">
                      {cat.count} {cat.count === 1 ? "Product" : "Products"}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm pt-2">
                      Explore Now{" "}
                      <ChevronRight
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>

                  {/* Visual Hint */}
                  <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
