import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/dashboard.scss";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Categories</h2>
        <nav>
          <ul>
            <li>
              <Link to="/category/electronics">Electronics</Link>
            </li>
            <li>
              <Link to="/category/clothing">Clothing</Link>
            </li>
            <li>
              <Link to="/category/books">Books</Link>
            </li>
            <li>
              <Link to="/category/home">Home & Kitchen</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {user?.name}</h1>
        </header>
        <div className="dashboard-content">
          <p>Select a category to browse products</p>
        </div>
      </main>
    </div>
  );
}
