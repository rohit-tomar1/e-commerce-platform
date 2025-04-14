import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductsByCategory } from '../features/products/productSlice'
import ProductCard from '../components/ProductCard'
import '../styles/category.scss'

export default function CategoryPage() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProductsByCategory(category))
  }, [category, dispatch])

  if (status === 'loading') {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="category-container">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}