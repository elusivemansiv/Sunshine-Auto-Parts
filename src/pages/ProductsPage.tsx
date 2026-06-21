import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Grid3X3, LayoutList, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryParam = searchParams.get('category');

  const brands = [...new Set(products.map(p => p.brand))];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter from URL
    if (categoryParam) {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
    }

    // Category filter from sidebar
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
    }

    return filtered;
  }, [categoryParam, selectedBrands, selectedCategories, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
  };

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-900">
            {categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : 'All Parts'}
          </h1>
          <p className="text-slate-500 mt-1">Showing {filteredProducts.length} products</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white shadow-sm rounded-xl border border-slate-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                filtersOpen ? 'bg-red-500/10 border-red-500/50 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`w-64 flex-shrink-0 ${filtersOpen ? 'block fixed inset-0 z-50 bg-white p-6 lg:relative lg:bg-transparent lg:p-0' : 'hidden lg:block'}`}
            >
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                  <button onClick={() => setFiltersOpen(false)} className="p-2 text-slate-500 hover:text-slate-900">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="w-4 h-4 rounded border-slate-300 bg-white text-red-600 focus:ring-red-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                          {cat.name}
                        </span>
                        <span className="text-xs text-slate-400">({cat.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 rounded border-slate-300 bg-white text-red-600 focus:ring-red-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Price Range</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-sm"
                      placeholder="Min"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-red-500"
                  />
                </div>

                {/* Apply Filters (Mobile) */}
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full lg:hidden py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.aside>
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg mb-4">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-500 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}