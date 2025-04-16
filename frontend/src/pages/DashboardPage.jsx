// src/pages/DashboardPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCategories, fetchCategories } from "../features/categories/categorySlice";
import { Link } from "react-router-dom";
import "../styles/dashboard.scss";
import { API_STATUS } from "../helper/constant";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
    return ()=>clearCategories()
  }, [status, dispatch]);

  // Function to get only parent categories (categories with no parentId)
  const getParentCategories = () => {
    const tmp =  categories.filter((category) => category.parentId === null);
    console.log(tmp)
    return tmp;
  };

  if (status === "loading") {
    return (
      <div className="dashboard-loading">
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>Error loading categories: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Categories</h2>
        <nav className="category-nav">
          {getParentCategories().map((category) => (
            <div key={category.id} className="category-group">
              <Link to={`/category/${category.id}`} className="parent-category">
                {category.name}
              </Link>
              {category.children && category.children.length > 0 && (
                <div className="subcategories">
                  {category.children.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/category/${subcategory.id}`}
                      className="subcategory"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome back, {user?.name}</h1>
          <p>Browse our products by category</p>
        </header>
        <div className="category-grid">
          {getParentCategories().map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="category-card"
            >
              <div className="category-icon">
                {category.imageUrl ? (
                  <img src={category.imageUrl} alt={category.name} />
                ) : (
                  <div className="default-icon">
                    {category.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              {category.children && category.children.length > 0 && (
                <div className="subcategory-count">
                  {category.children.length} subcategories
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
