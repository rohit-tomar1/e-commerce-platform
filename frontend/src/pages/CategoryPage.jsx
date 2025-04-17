// src/pages/CategoryPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar";
import "../styles/category.scss";
import { useEffect } from "react";
import { fetchCategories } from "../features/categories/categorySlice";
import ProductCard from "../components/ProductCard";
import { fetchProductsByCategory } from "../features/products/productSlice";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.category;
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories?.length) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);
  const currentCategory = categories?.find((c) => c.id === categoryId);

  const { products, status, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId));
  }, [categoryId, dispatch]);

  return (
    <div className="category-page-container">
      <CategorySidebar categories={categories} />

      <main className="product-listing-content">
        <div className="filter-header">
          <h1>{currentCategory?.name || "Products"}</h1>

          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="price-range">Price range:</label>
              <select id="price-range">
                <option value="all">All</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200+">$200+</option>
              </select>
            </div>

            <button className="filter-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                <path d="M6 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              </svg>
              More Filters
            </button>
          </div>
        </div>
        <div className="products-grid">
          {!products?.length && <p>No Product Found!</p>}
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
