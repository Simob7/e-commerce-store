"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Lock,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Truck,
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

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!/^\d{5}$/.test(formData.zip))
      newErrors.zip = "Valid 5-digit ZIP required";
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Valid 16-digit card required";
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry))
      newErrors.expiry = "MM/YY format";
    if (!/^\d{3}$/.test(formData.cvc)) newErrors.cvc = "3 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Order Placed Successfully!");
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      {/* 1. SMART HEADER: Progress Indicator */}
      <header className="bg-white border-b sticky top-0 z-40 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-black tracking-tighter text-blue-600">
            SHOPHUB
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Cart</span> <ChevronRight size={14} />
            <span className="text-gray-900">Checkout</span>{" "}
            <ChevronRight size={14} />
            <span>Success</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold">
            <ShieldCheck size={14} /> Secure
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* RIGHT COLUMN (Order Summary) 
              - 'order-first': Displays at the top on Mobile
              - 'lg:order-last': Displays on the right on Desktop
          */}
          <div className="lg:col-span-4 order-first lg:order-last">
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                Order Review{" "}
                <span className="text-sm font-medium text-gray-400">
                  ({cart.length})
                </span>
              </h3>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center animate-in fade-in duration-500">
                    <div className="relative w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <p className="text-sm font-black text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between text-gray-500 text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-semibold">
                  <span className="flex items-center gap-1">
                    <Truck size={14} /> Shipping
                  </span>
                  <span className="text-green-600">
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN (The Form) */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black shadow-inner">
                  01
                </div>
                <div>
                  <h2 className="text-2xl font-black">Shipping Address</h2>
                  <p className="text-sm text-gray-400">
                    Where should we send your order?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="First Name"
                  error={errors.firstName}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
                  error={errors.lastName}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    error={errors.address}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <Input
                  label="City"
                  error={errors.city}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <Input
                  label="ZIP / Postal Code"
                  placeholder="12345"
                  error={errors.zip}
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                />
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-gray-900" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center font-black">
                  02
                </div>
                <div>
                  <h2 className="text-2xl font-black">Payment Method</h2>
                  <p className="text-sm text-gray-400">
                    All transactions are encrypted and secure.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Input
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    error={errors.cardNumber}
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                  />
                </div>
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  error={errors.expiry}
                  value={formData.expiry}
                  onChange={(e) =>
                    setFormData({ ...formData, expiry: e.target.value })
                  }
                />
                <Input
                  label="CVC Code"
                  placeholder="123"
                  error={errors.cvc}
                  value={formData.cvc}
                  onChange={(e) =>
                    setFormData({ ...formData, cvc: e.target.value })
                  }
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group w-full py-6 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                isSubmitting
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-blue-600 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-blue-200"
              }`}>
              {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
              {!isSubmitting && (
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`w-full px-6 py-4 rounded-2xl font-semibold outline-none transition-all border-2 ${
            error
              ? "bg-red-50 border-red-100 focus:border-red-500 text-red-900"
              : "bg-white border-gray-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 text-gray-900"
          }`}
        />
        {error && (
          <AlertCircle
            size={20}
            className="absolute right-4 top-4 text-red-500 animate-pulse"
          />
        )}
      </div>
      {error && (
        <p className="text-[11px] font-bold text-red-500 uppercase tracking-tight ml-1">
          {error}
        </p>
      )}
    </div>
  );
}
