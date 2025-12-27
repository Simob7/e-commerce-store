"use client";
import React, { useState } from "react";

export default function ProductGallery({ product }) {
  // Initialize state with the main product image
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Expanded mock array to demonstrate scrolling capability
  const images = product.images || [
    product.image,
    "/api/placeholder/400/400", // Representative of extra images
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
  ];

  return (
    <div className="space-y-4">
      {/* Main Image Display - Stays Static */}
      <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-4/5 h-4/5 object-contain transition-all duration-500"
          key={selectedImage} // Force a re-animation when image changes
        />
      </div>

      {/* Thumbnail Navigation - Now Scrollable */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 px-1 no-scrollbar snap-x">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`flex-shrink-0 w-20 h-20 aspect-square rounded-xl border-2 flex items-center justify-center bg-white cursor-pointer transition-all snap-start ${
                selectedImage === img
                  ? "border-blue-600 shadow-md scale-105"
                  : "border-gray-100 hover:border-gray-300"
              }`}>
              <img
                src={img}
                alt={`thumbnail-${index}`}
                className={`w-14 h-14 object-contain transition-opacity ${
                  selectedImage === img ? "opacity-100" : "opacity-60"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Visual Indicator for "More Images" */}
        {images.length > 4 && (
          <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}
