"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Lock,
  CreditCard,
  Truck,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = 15.0;
  const total = cartTotal + shippingFee;

  // 1. Validation Logic
  const validate = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Shipping address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!/^\d{5}$/.test(formData.zip))
      newErrors.zip = "Enter a valid 5-digit ZIP";

    // Simple Card Validation
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry))
      newErrors.expiry = "Use MM/YY format";
    if (!/^\d{3}$/.test(formData.cvc)) newErrors.cvc = "CVC must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API Call
      setTimeout(() => {
        alert("Order Placed Successfully!");
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing again
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b py-6 mb-8 text-center font-bold text-2xl">
        🛍️ ShopHub Portfolio Checkout
      </div>

      <main className="max-w-7xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Checkout Form */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  error={errors.firstName}
                  value={formData.firstName}
                  onChange={(e) => handleChange(e, "firstName")}
                />
                <Input
                  label="Last Name"
                  error={errors.lastName}
                  value={formData.lastName}
                  onChange={(e) => handleChange(e, "lastName")}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    error={errors.address}
                    value={formData.address}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </div>
                <Input
                  label="City"
                  error={errors.city}
                  value={formData.city}
                  onChange={(e) => handleChange(e, "city")}
                />
                <Input
                  label="Postal Code"
                  placeholder="12345"
                  error={errors.zip}
                  value={formData.zip}
                  onChange={(e) => handleChange(e, "zip")}
                />
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold">Payment</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 1234 5678"
                    error={errors.cardNumber}
                    value={formData.cardNumber}
                    onChange={(e) => handleChange(e, "cardNumber")}
                  />
                </div>
                <Input
                  label="Expiry (MM/YY)"
                  placeholder="12/25"
                  error={errors.expiry}
                  value={formData.expiry}
                  onChange={(e) => handleChange(e, "expiry")}
                />
                <Input
                  label="CVC"
                  placeholder="123"
                  error={errors.cvc}
                  value={formData.cvc}
                  onChange={(e) => handleChange(e, "cvc")}
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-blue-600 shadow-xl"
              }`}>
              {isSubmitting ? "Processing..." : "Complete Purchase"}{" "}
              <ChevronRight size={20} />
            </button>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {/* Product List */}
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm mb-4">
                      Your cart is empty
                    </p>
                    <Link
                      href="/shop"
                      className="text-blue-600 font-bold text-sm">
                      Return to Shop
                    </Link>
                  </div>
                )}
              </div>

              {/* Calculation */}
              <div className="space-y-3 pt-6 border-t border-gray-100 mb-6">
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                {/* Optional: Add Tax if needed */}
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>Estimated Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-3 border-t">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>

              {/* Trust Message */}
              <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-widest">
                <Lock size={12} />
                Secure SSL Checkout
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

// 2. Enhanced Reusable Input with Error display
function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
      <div className="relative">
        <input
          {...props}
          className={`w-full px-5 py-3 rounded-xl outline-none transition-all border ${
            error
              ? "bg-red-50 border-red-300 focus:border-red-500 ring-red-100"
              : "bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-600 ring-blue-50"
          } focus:ring-4`}
        />
        {error && (
          <div className="absolute right-4 top-3.5 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-semibold text-red-500 ml-1">{error}</p>
      )}
    </div>
  );
}
