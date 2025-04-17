import { Link } from 'react-router-dom'
import '../styles/productCard.scss'

export default function ProductCard({ product }) {
  console.log({product})
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">${product.price}</p>
          <p className="rating">Rating: {product.rating || '4.6' }/5</p>
        </div>
      </Link>
    </div>
  )
}