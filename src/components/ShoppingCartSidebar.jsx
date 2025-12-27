"use client";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function ShoppingCartSidebar() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, cartTotal } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Enhanced Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 z-40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        {/* 2. Header Design */}
        <div className="px-8 py-7 border-b flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Your Cart
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {cart.length} {cart.length === 1 ? "item" : "items"} selected
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="group p-2.5 hover:bg-gray-100 rounded-full transition-all active:scale-90">
            <X
              size={22}
              className="text-gray-400 group-hover:text-gray-900 transition-colors"
            />
          </button>
        </div>

        {/* 3. Items List */}
        <div className="flex-1 overflow-y-auto px-8 py-6 no-scrollbar space-y-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-gray-200" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  Your cart is empty
                </p>
                <p className="text-gray-500 mt-2 max-w-[200px] mx-auto text-sm leading-relaxed">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-600 font-bold hover:underline underline-offset-4">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex gap-5 group">
                  {/* Image Container */}
                  <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group-hover:border-gray-200 transition-colors flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-3 mix-blend-multiply"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Modern Quantity Pill */}
                      <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-all text-gray-500 hover:text-gray-900 hover:shadow-sm">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-all text-gray-500 hover:text-gray-900 hover:shadow-sm">
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="font-bold text-gray-900 tracking-tight">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Footer Design */}
        {cart.length > 0 && (
          <div className="p-8 border-t bg-gray-50/50 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium pb-2 border-b border-gray-200">
                <span>Shipping</span>
                <span className="text-green-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-900 text-2xl font-black pt-2">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-3 w-full py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-[0.98]">
              Checkout Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <p className="text-center text-xs text-gray-400">
              Tax included. Secure encrypted checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
