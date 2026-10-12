import React from 'react'
import MarketHero from '../components/marketplace/MarketHero'
import ProductGrid from '../components/marketplace/ProductGrid'
import { useRouter } from '../router/RouterContext'

export default function HomePage({
  searchQuery,
  onAddToCart,
  onProductSelect
}) {
  const { navigate } = useRouter()

  const scrollToCatalog = () => {
    const el = document.getElementById('products-catalog')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section Banner Carousel (GET /store/banner/websidelist) */}
      <MarketHero onExploreClick={scrollToCatalog} />

      {/* Main Filterable Products Catalog (GET /store/category/websidelist & GET /store/product/websidelist) */}
      <ProductGrid
        searchQuery={searchQuery}
        onAddToCart={onAddToCart}
        onProductSelect={(prod) => {
          if (onProductSelect) {
            onProductSelect(prod)
          } else {
            navigate(`/product/${prod._id || prod.id}`)
          }
        }}
      />
    </div>
  )
}
