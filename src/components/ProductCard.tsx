import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover shadow-sm"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.originalPrice && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">
            SALE
          </span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs font-bold rounded-md">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Brand */}
        <div className="text-xs text-red-400 font-medium mb-1">{product.brand}</div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm sm:text-base text-slate-900 font-semibold mb-1 sm:mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500">({product.reviews})</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline flex-wrap gap-1 sm:gap-2">
            <span className="text-base sm:text-lg font-bold text-slate-900">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-slate-400 line-through">
                ${product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            disabled={!product.inStock}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg shrink-0 flex items-center justify-center transition-colors ${
              !product.inStock 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}