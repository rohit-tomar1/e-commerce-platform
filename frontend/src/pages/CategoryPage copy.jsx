import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProductsByCategory } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import "../styles/category.scss";
import { API_STATUS } from "../helper/constant";

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const catName = searchParams.get("catName");
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [category, dispatch]);

  if (status === API_STATUS.LOADING) {
    return <div className="loading"> Loading...</div>;
  }

  if (error) {
    return <div className="error"> Error is {error}</div>;
  }

  return (
    <div className="category-container">
      <h1>{catName.charAt(0).toUpperCase() + catName.slice(1)}</h1>
      {!products.length && (
        <div className="products-grid">
          <h2>No Prorduct Found!</h2>
        </div>
      )}
      <div className="products-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
