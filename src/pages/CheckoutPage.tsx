import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, CreditCard, Truck, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = totalPrice;
  const shipping = subtotal >= 199 ? 0 : 19.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (clearCart) clearCart();
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }, 2000);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/products" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Order Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for your purchase. We'll email you an order confirmation with details and tracking info.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Redirecting to home...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Details */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Shipping Information</h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Street Address</label>
                      <input required type="text" placeholder="123 Performance Way" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">City</label>
                      <input required type="text" placeholder="Detroit" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">State</label>
                        <input required type="text" placeholder="MI" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">ZIP Code</label>
                        <input required type="text" placeholder="48201" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input required type="text" placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Expiration Date</label>
                        <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">CVC</label>
                        <input required type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-lg"
                >
                  {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  {!isProcessing && <Shield className="w-5 h-5" />}
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6 pb-6 border-b border-slate-100">Order Summary</h2>
                
                <div className="space-y-5 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 group-hover:border-red-200 transition-colors">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl space-y-3 mb-6 border border-slate-100">
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-bold' : 'text-slate-900 font-semibold'}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Tax (est. 8%)</span>
                    <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-center">
                    <span className="text-base font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-red-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm text-blue-800">
                  <Truck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5">Free Premium Shipping</p>
                    <p className="text-blue-600/80">Estimated delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
