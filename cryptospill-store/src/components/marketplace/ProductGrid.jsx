import React, { useState, useEffect, useCallback, useRef } from 'react'
import ProductCard from './ProductCard'
import { getPublicWebsiteCategories } from '../../services/storeCategoryService'
import { getPublicWebsiteProducts } from '../../services/storeProductService'

export default function ProductGrid({
  searchQuery = '',
  onAddToCart,
  onProductSelect
}) {
  // 1. Categories State from GET /store/category/websidelist
  const [categories, setCategories] = useState([])
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all')

  // 2. Products State from GET /store/product/websidelist
  const [products, setProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 12

  // Sort State: featured (default) | trending | newest | price-asc | price-desc | rating
  const [sortBy, setSortBy] = useState('featured')

  // Statuses
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch Categories on mount
  useEffect(() => {
    let isMounted = true
    getPublicWebsiteCategories()
      .then((res) => {
        if (isMounted) {
          if (res.success && Array.isArray(res.data)) {
            setCategories(res.data)
          } else {
            setCategories([])
          }
        }
      })
      .catch((err) => {
        console.warn('Failed to load categories:', err)
        if (isMounted) setCategories([])
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Fetch Products from GET /store/product/websidelist
  const fetchProducts = useCallback(async (targetPage = 1) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const res = await getPublicWebsiteProducts({
        page: targetPage,
        limit,
        search_key: searchQuery,
        category: selectedCategorySlug === 'all' ? 'all' : selectedCategorySlug,
        sort: sortBy
      })

      if (res.success && res.data) {
        setProducts(res.data.result || [])
        setTotalCount(res.data.totalCount || 0)
        setPage(targetPage)
      } else {
        setErrorMessage(res.message || 'Unable to load products from store catalog.')
        setProducts([])
        setTotalCount(0)
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to connect to marketplace products service.')
      setProducts([])
      setTotalCount(0)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategorySlug, sortBy, searchQuery])

  // Refetch page 1 when category pill, sort, or search changes
  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  // Category change handler
  const handleCategoryChange = (slug) => {
    setSelectedCategorySlug(slug)
    setPage(1)
  }

  // Sort change handler
  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    setPage(1)
  }

  // Pagination calculation
  const totalPages = Math.ceil(totalCount / limit) || 1

  return (
    <div id="products-catalog" className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      
      {/* ==================================================== */}
      {/* 1. CATEGORY PILLS BAR */}
      {/* First pill is always "All Products". Fully rounded pills. */}
      {/* Active: dark navy bg, white text. Inactive: white bg, light border, dark text. */}
      {/* ==================================================== */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-3 -mx-3 px-3 sm:mx-0 sm:px-0 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Fixed First Pill: All Products */}
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
            selectedCategorySlug === 'all'
              ? 'bg-[#0f172a] text-white shadow-sm'
              : 'bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 shadow-2xs'
          }`}
        >
          All Products
        </button>

        {/* Categories from GET /store/category/websidelist */}
        {categories.map((cat) => {
          const isActive = selectedCategorySlug === cat.slug
          return (
            <button
              key={cat._id || cat.slug}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* ==================================================== */}
      {/* 2. PAGE HEADING, SUBTITLE & SORT CONTROL */}
      {/* ==================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 mb-6 sm:mb-8 pt-4 sm:pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            All Verified Marketplace Items
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {totalCount} {totalCount === 1 ? 'item' : 'items'} ready for instant decentralized checkout
          </p>
        </div>

        {/* Sort Control on Right */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-semibold shrink-0">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-white text-xs sm:text-sm text-slate-800 font-bold border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 cursor-pointer shadow-2xs"
          >
            <option value="featured">Featured & Trending</option>
            <option value="trending">Trending Now</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. ERROR, LOADING, EMPTY & GRID STATES */}
      {/* ==================================================== */}
      {errorMessage ? (
        <div className="py-16 text-center bg-white border border-rose-200 rounded-3xl p-8 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center text-xl font-bold mb-3">
            ⚠️
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Unable to Load Products</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">{errorMessage}</p>
          <button
            type="button"
            onClick={() => fetchProducts(page)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition"
          >
            Try Again
          </button>
        </div>
      ) : isLoading ? (
        /* Loading Skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl h-80 animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="w-full h-44 bg-slate-100 rounded-xl mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-4 bg-slate-200 rounded w-4/5" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded w-16" />
                <div className="h-8 bg-slate-200 rounded-xl w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center mb-4 text-2xl">
            📦
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No items found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
            There are no products available in this category matching your selection.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategorySlug('all')
              setSortBy('featured')
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition"
          >
            Reset Category
          </button>
        </div>
      ) : (
        <>
          {/* Products Grid: 4 columns desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={() => {
                  if (typeof onProductSelect === 'function') {
                    onProductSelect(product)
                  }
                }}
              />
            ))}
          </div>

          {/* ==================================================== */}
          {/* 4. PAGINATION */}
          {/* ==================================================== */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => fetchProducts(page - 1)}
                disabled={page <= 1 || isLoading}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => fetchProducts(pNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                      pNum === page
                        ? 'bg-[#0f172a] text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => fetchProducts(page + 1)}
                disabled={page >= totalPages || isLoading}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

    </div>
  )
}
