import { Link } from 'react-router-dom'
import '../styles/productCard.scss'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="rating">Rating: {product.rating}/5</p>
        </div>
      </Link>
    </div>
  )
}