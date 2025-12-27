"use client";
import { useState, useRef, useEffect } from "react";
import { Star, CheckCircle2, ThumbsUp } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const scrollRef = useRef(null);

  // 1. DATA LOGIC: Extract unique counts for the UI
  const productReviews = REVIEWS.filter((r) => r?.productId === product?.id);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specs" }, // Shortened for mobile space
    { id: "shipping", label: "Shipping" },
    { id: "reviews", label: `Reviews (${productReviews?.length})` },
  ];

  // 2. SMART SCROLL: Automatically center the active tab on mobile
  useEffect(() => {
    const activeElement = document.getElementById(`tab-${activeTab}`);
    if (activeElement && scrollRef?.current) {
      const scrollContainer = scrollRef?.current;
      const scrollLeft =
        activeElement.offsetLeft -
        scrollContainer.offsetWidth / 2 +
        activeElement.offsetWidth / 2;
      scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-12">
      {/* TAB HEADER 
          - 'no-scrollbar': Keeps it clean while allowing horizontal swipe
          - 'snap-x': Ensures tabs snap into place on mobile
      */}
      <div
        ref={scrollRef}
        className="flex border-b overflow-x-auto no-scrollbar snap-x touch-pan-x">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] sm:min-w-0 px-4 sm:px-8 py-5 text-sm font-bold transition-all relative snap-center ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            <span className="relative z-10">{tab.label}</span>
            {activeTab === tab.id && (
              /* High-end animated under-bar */
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full transition-all" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="p-5 sm:p-10">
        {/* Description Tab - Dynamic Typography */}
        {activeTab === "description" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Product Details
            </h3>
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                Our {product?.name} is engineered for peak performance. This
                premium
                {product?.category} combines innovative design with high-quality
                materials.
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Premium build quality with eco-friendly materials",
                  "Ergonomic design for comfortable all-day use",
                  "Compatible with all standard industry accessories",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Specs Tab - Responsive Grid */}
        {activeTab === "specs" && (
          <div className="animate-in fade-in duration-300 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { label: "Material", value: "Grade A Polymer" },
              { label: "Weight", value: "1.2 lbs / 540g" },
              { label: "Dimensions", value: '10" x 4" x 2"' },
              { label: "Finish", value: "Matte Anodized" },
            ].map((spec, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-gray-50 items-center">
                <span className="text-gray-500 text-sm">{spec.label}</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Shipping Tab - Minimalist Icons */}
        {activeTab === "shipping" && (
          <div className="animate-in fade-in duration-300 space-y-6">
            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                <ThumbsUp size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  Free Standard Shipping
                </p>
                <p className="text-sm text-gray-500">
                  Delivered in 3-5 business days
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic">
              * International rates calculated at checkout.
            </p>
          </div>
        )}

        {/* Reviews Tab - Layout optimization */}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-300 space-y-8">
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-50 pb-8 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">
                            {review.author}
                          </span>
                          {review.verified && (
                            <span className="hidden xs:flex items-center gap-1 text-[9px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold uppercase">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-200"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    {review.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 opacity-50">
                <p>No reviews yet for this product.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
