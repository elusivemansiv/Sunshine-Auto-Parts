import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = subtotal >= 199 ? 0 : 19.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h1>
          <p className="text-slate-500 mb-8">Looks like you haven't added any parts to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-slate-900 font-semibold hover:text-red-500 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-500 mt-1">${item.price.toLocaleString()} each</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-slate-900 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-slate-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-white shadow-sm rounded-2xl border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-sm"
                    />
                  </div>
                  <button className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium rounded-xl border border-slate-200 transition-colors shadow-sm">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-slate-900'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (est.)</span>
                  <span className="text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-slate-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 199 && (
                <div className="mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600">
                    Add <span className="text-red-600 font-medium">${(199 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}

              <Link to="/checkout" className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 mb-4 shadow-md">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/products"
                className="block text-center text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Truck className="w-4 h-4 text-red-500" />
                  <span>Free shipping on orders $199+</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}