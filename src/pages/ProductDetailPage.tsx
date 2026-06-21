import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Check, Truck, Shield, RotateCcw, Minus, Plus, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'compatibility'>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-red-600 hover:text-red-500 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link to="/products" className="text-slate-500 hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-slate-500 hover:text-slate-900 transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.originalPrice && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
                SALE
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="text-sm text-red-600 font-medium mb-2">{product.brand}</div>
            <h1 className="text-3xl font-bold font-heading text-slate-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* SKU */}
            <div className="text-sm text-slate-500 mb-6">SKU: {product.sku}</div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-slate-900 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-slate-300 disabled:to-slate-300 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-500" />
                <span className="text-xs text-slate-500">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                <span className="text-xs text-slate-500">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-500" />
                <span className="text-xs text-slate-500">30 Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex border-b border-slate-200 mb-8">
            {(['description', 'specs', 'compatibility'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? 'text-red-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
                <p className="text-slate-600 mt-4">
                  This premium {product.brand} product is designed for enthusiasts who demand the best. Engineered with precision and built to last, it delivers exceptional performance and reliability for your vehicle.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-500">{spec.label}</span>
                    <span className="text-slate-900 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <h4 className="text-slate-900 font-semibold mb-4">Compatible Vehicles</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {product.compatibleVehicles.map((vehicle, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-slate-700">{vehicle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}