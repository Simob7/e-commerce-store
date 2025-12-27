"use client";
import React, { useState } from "react";

export default function ProductGallery({ product }) {
  // 1. Initialize state with the main product image
  const [selectedImage, setSelectedImage] = useState(product.image);

  // If your product data has an array of images, use that.
  // Otherwise, we'll use this mock array for the thumbnails:
  const images = product.images || [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
        <img
          src={selectedImage} // 2. Use the state variable here
          alt={product.name}
          className="w-4/5 h-4/5 object-contain transition-all duration-500 hover:scale-110"
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)} // 3. Update state on click
            className={`aspect-square rounded-lg border-2 flex items-center justify-center bg-white cursor-pointer transition-all ${
              selectedImage === img
                ? "border-blue-600 shadow-sm" // 4. Highlight active thumbnail
                : "border-transparent hover:border-gray-200"
            }`}>
            <img
              src={img}
              alt={`thumbnail-${index}`}
              className={`w-12 h-12 object-contain transition-opacity ${
                selectedImage === img ? "opacity-100" : "opacity-60"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
