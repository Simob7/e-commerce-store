"use client";
import { useState } from "react";
import { Star, CheckCircle2, ThumbsUp } from "lucide-react";
// Ensure this path matches where you saved your reviews data
import { REVIEWS } from "@/data/reviews";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "shipping", label: "Shipping" },
    {
      id: "reviews",
      label: `Reviews (${
        REVIEWS.filter((r) => r.productId === product.id).length
      })`,
    },
  ];

  // Filter reviews for this specific product
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex border-b overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 sm:px-8 py-4 text-sm font-semibold transition-all whitespace-nowrap relative ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose prose-blue max-w-none text-gray-600">
            <p>
              Our {product.name} is engineered for peak performance and
              durability. This premium product from our {product.category}{" "}
              collection combines innovative design with high-quality materials
              to ensure a superior user experience.
            </p>
            <ul className="mt-4 space-y-2">
              <li>Premium build quality with eco-friendly materials</li>
              <li>Ergonomic design for comfortable all-day use</li>
              <li>Compatible with all standard industry accessories</li>
            </ul>
          </div>
        )}

        {/* Specs Tab */}
        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Material</span>
              <span className="font-medium">Grade A Polymer / Aluminum</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Weight</span>
              <span className="font-medium">1.2 lbs</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Dimensions</span>
              <span className="font-medium">10" x 4" x 2"</span>
            </div>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === "shipping" && (
          <div className="text-gray-600 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p>Standard delivery: 3-5 business days (Free)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <p>Express delivery: 1-2 business days ($14.99)</p>
            </div>
            <p className="mt-4 text-sm italic text-gray-400">
              Note: International shipping might take up to 14 days depending on
              location.
            </p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-8 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">
                            {review.author}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              <CheckCircle2 size={10} /> Verified
                            </span>
                          )}
                        </div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
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
                    <span className="text-sm text-gray-400">{review.date}</span>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-2">
                    {review.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {review.comment}
                  </p>

                  <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg">
                    <ThumbsUp size={14} />
                    Helpful ({review.helpful || 0})
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No reviews yet for this product.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
