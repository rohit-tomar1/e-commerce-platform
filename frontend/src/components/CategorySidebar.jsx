import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/categorySidebar.scss";

export default function CategorySidebar({ categories }) {
  const { categoryId } = useParams();
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (categories?.length > 0 && categoryId) {
      const newExpanded = {};

      const expandParents = (catId) => {
        const category = categories.find((c) => c.id === catId);
        if (category?.parentId) {
          newExpanded[category.parentId] = true;
          expandParents(category.parentId);
        }
      };

      expandParents(categoryId);
      setExpandedCategories(newExpanded);
    }
  }, [categoryId, categories]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <aside className="category-sidebar">
      <h2>Categories</h2>
      <nav className="category-nav">
        {categories
          ?.filter((category) => category.parentId === null)
          .map((category) => (
            <div key={category.id} className="category-group">
              <div
                className={`parent-category ${
                  category.id === categoryId ? "active" : ""
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <Link to={`/category/${category.id}`}>{category.name}</Link>
                {category.children && category.children.length > 0 && (
                  <span className="toggle-icon">
                    {expandedCategories[category.id] ? "−" : "+"}
                  </span>
                )}
              </div>

              {category.children && category.children.length > 0 && (
                <div
                  className="subcategories"
                  style={{
                    display: expandedCategories[category.id] ? "block" : "none",
                  }}
                >
                  {category.children.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/category/${subcategory.id}`}
                      className={`subcategory ${
                        subcategory.id === categoryId ? "active" : ""
                      }`}
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
  );
}
