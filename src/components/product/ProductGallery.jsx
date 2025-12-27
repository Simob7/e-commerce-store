"use client";
import React, { useState } from "react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product?.image);

  const images = product?.images || [
    product?.image,
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
  ];

  return (
    /* Change 1: Use a flex-col-reverse on mobile (thumbnails bottom) 
       and flex-row on desktop (thumbnails left) 
    */
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Navigation */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:max-h-[500px] px-1 py-1">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl border-2 transition-all p-2 bg-white flex items-center justify-center ${
              selectedImage === img
                ? "border-blue-600 ring-4 ring-blue-50 scale-95"
                : "border-gray-100 hover:border-blue-200"
            }`}>
            <img
              src={img}
              alt={`View ${index}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="flex-1 aspect-square bg-gray-50 rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-gray-100 relative group">
        {/* Discount Badge - Optional UI touch */}
        <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
          SALE -30%
        </span>

        <img
          src={selectedImage}
          alt={product?.name}
          key={selectedImage}
          className="w-4/5 h-4/5 object-contain transition-all duration-700 ease-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}
