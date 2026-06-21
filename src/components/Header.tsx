import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Shop All', href: '/products' },
    { name: 'Brakes', href: '/products?category=brakes' },
    { name: 'Suspension', href: '/products?category=suspension' },
    { name: 'Engine', href: '/products?category=engine' },
    { name: 'Wheels', href: '/products?category=wheels' },
  ];

  return (
    <>
      {/* Top Bar */}
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-slate-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              <span>1-800-AUTO-PARTS</span>
            </span>
            <span>Free Shipping on Orders $199+</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/track" className="hover:text-slate-900 transition-colors">Track Order</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help Center</Link>
            <Link to="/deals" className="text-red-400 hover:text-red-300 transition-colors font-medium">Today's Deals</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/50' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-xl font-heading">S</span>
                </div>
                <div className="absolute inset-0 bg-red-500/30 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold font-heading text-slate-900">Sunshine</span>
                <span className="text-xl font-bold font-heading text-red-500">Auto Parts</span>
                <span className="block text-xs text-slate-500 -mt-1">Performance Specialists</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href || (link.href !== '/products' && location.search.includes(link.href.split('=')[1]))
                      ? 'text-red-600 bg-red-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-1">
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {['Exhaust', 'Cooling', 'Lighting', 'Interior'].map((item) => (
                      <Link
                        key={item}
                        to={`/products?category=${item.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden md:block overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Search parts..."
                      className="w-64 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:block p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-200 shadow-xl"
            >
              <div className="px-4 py-4 space-y-2">
                <div className="pb-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search parts..."
                      className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </header>
    </>
  );
}