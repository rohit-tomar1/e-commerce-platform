import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../features/categories/categorySlice'
import CategorySidebar from '../components/CategorySidebar'
import '../styles/dashboard.scss'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { categories, status, error } = useSelector((state) => state.categories)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>Error loading dashboard: {error}</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <CategorySidebar categories={categories} />
      
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome back, {user?.name}</h1>
          <p>Browse our products by category</p>
        </header>
        <div className="category-grid">
          {categories
            ?.filter(category => category.parentId === null)
            .map((category) => (
              <div key={category.id} className="category-card">
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
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}