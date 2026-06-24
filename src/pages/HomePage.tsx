import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award, Star, Quote, ChevronRight, Zap, Percent, Package, Disc, Layers, Wind, Gauge, Circle, Thermometer, Lightbulb, Armchair } from 'lucide-react';
import VehicleSearch from '../components/VehicleSearch';

const categoryIcons: Record<string, any> = {
  "Brakes": Disc,
  "Suspension": Layers,
  "Exhaust": Wind,
  "Engine": Gauge,
  "Wheels": Circle,
  "Cooling": Thermometer,
  "Lighting": Lightbulb,
  "Interior": Armchair
};
import ProductCard from '../components/ProductCard';
import { products, categories, reviews } from '../data/products';

export default function HomePage() {
  const bestSellers = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent z-10" />
            <img
              src="/hero_garage_light.png"
              alt="Sunshine Auto Parts Performance Garage"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6"
              >
                <span className="text-white">Premium</span>
                <br />
                <span className="gradient-text">Performance Parts</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-300 mb-8 max-w-lg"
              >
                Transform your ride with top-tier automotive parts. Expert support, fast shipping, and unbeatable prices on the brands you trust.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/25"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?sale=true"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 transition-all shadow-sm"
                >
                  <Percent className="w-5 h-5 text-red-500" />
                  View Deals
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-10 pt-10 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
                      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
                    ].map((url, i) => (
                      <img key={i} src={url} alt={`Client ${i + 1}`} className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-semibold">50K+</span>
                    <span className="text-slate-400"> Happy Customers</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-slate-400 ml-1">4.9/5</span>
                </div>
              </motion.div>
            </div>

            {/* Vehicle Search */}
            <div className="hidden lg:block">
              <VehicleSearch />
            </div>
          </div>
        </div>
      </section>



      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold font-heading text-slate-900">Shop by Category</h2>
              <p className="text-slate-600 mt-1">Browse our extensive collection of performance parts</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.name] || Package;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl aspect-square md:aspect-[4/3] bg-white border border-slate-200 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-300 mb-3 md:mb-4 shadow-sm border border-slate-100 group-hover:border-red-500/30">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-slate-400 group-hover:text-red-500 transition-colors drop-shadow-sm" />
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-red-500 transition-colors">{category.name}</h3>
                      <p className="text-xs md:text-sm text-slate-500">{category.count} Products</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 md:p-12"
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-3">
                  <Clock className="w-4 h-4" />
                  Limited Time Offer
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Summer Sale - Up to 40% Off!</h3>
                <p className="text-white/80">Use code SUMMER40 at checkout. Free shipping on orders $199+</p>
              </div>
              <Link
                to="/products?sale=true"
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                Shop Sale Items
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold font-heading text-slate-900">Best Sellers</h2>
              <p className="text-slate-600 mt-1">Top-rated products loved by our customers</p>
            </div>
            <Link to="/products?sort=bestselling" className="hidden md:inline-flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $199' },
              { icon: Shield, title: 'Secure Payments', desc: '256-bit SSL encryption' },
              { icon: Clock, title: 'Fast Delivery', desc: 'Same-day shipping available' },
              { icon: Award, title: 'Expert Support', desc: 'Certified technicians on staff' },
            ].map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <badge.icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{badge.title}</h3>
                <p className="text-sm text-slate-600">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold font-heading text-slate-900">New Arrivals</h2>
              <p className="text-slate-600 mt-1">The latest additions to our catalog</p>
            </div>
            <Link to="/products?sort=newest" className="hidden md:inline-flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">What Our Customers Say</h2>
            <p className="text-slate-600">Real reviews from real car enthusiasts</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 group flex flex-col"
              >
                {/* Large Background Quote */}
                <Quote className="absolute -top-6 -right-6 w-40 h-40 text-white/5 transform -scale-x-100 group-hover:rotate-12 transition-transform duration-500" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-red-500 fill-red-500' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-lg italic text-slate-300 mb-8 relative z-10 leading-relaxed grow">
                  "{review.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-white/10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="relative w-12 h-12 rounded-full object-cover border-2 border-slate-800"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-red-400 transition-colors">{review.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{review.date} • {review.product}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl p-8 md:p-16"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/5 to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
                Ready to Upgrade Your Ride?
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Join thousands of satisfied customers who trust Sunshine Auto Parts for their performance needs. Get expert advice, competitive prices, and fast shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/25"
                >
                  <Package className="w-5 h-5" />
                  Browse All Parts
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold rounded-xl border border-slate-200 transition-all shadow-sm"
                >
                  Contact Our Experts
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}