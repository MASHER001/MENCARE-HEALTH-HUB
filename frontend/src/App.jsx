import { useEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, Route, Routes, Link } from 'react-router-dom';
import HealthFacts from './pages/HealthFacts';
import MythFacts from './pages/MythFacts';
import AdminLogin from './pages/AdminLogin';
import AdminHealthFacts from './pages/AdminHealthFacts';
import AdminMythFacts from './pages/AdminMythFacts';
import ProjectBot from './components/ProjectBot';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('mencare_token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="admin-page-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <Link to="/admin/health-facts" className="brand-link">
              MenCare Admin
            </Link>
          </div>

          <nav className="admin-sidebar-nav" aria-label="Admin navigation">
            <NavLink
              to="/admin/health-facts"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              Health Facts
            </NavLink>
            <NavLink
              to="/admin/myth-facts"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              Myth vs Fact
            </NavLink>
          </nav>

          <button
            type="button"
            className="primary-btn admin-logout"
            onClick={() => {
              localStorage.removeItem('mencare_token');
              localStorage.removeItem('mencare_user');
              window.location.href = '/admin/login';
            }}
          >
            Logout
          </button>
        </aside>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('mencare-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mencare-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <div className="brand-block">
            <Link to="/health-facts" className="brand-link">
              MenCare Health Hub
            </Link>
          </div>

          <nav className="nav-links" aria-label="Main navigation">
            <Link to="/health-facts">Health Facts</Link>
            <Link to="/myth-facts">Myth vs Fact</Link>
            <Link to="/admin/login">Admin Login</Link>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>

      <main className="page-layout">
        <Routes>
          <Route path="/" element={<Navigate to="/health-facts" replace />} />
          <Route path="/health-facts" element={<HealthFacts />} />
          <Route path="/myth-facts" element={<MythFacts />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/health-facts" replace />} />
            <Route path="health-facts" element={<AdminHealthFacts />} />
            <Route path="myth-facts" element={<AdminMythFacts />} />
          </Route>
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-links" aria-label="Footer links">
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Terms and Conditions</span>
            <span className="footer-link">Copyright 2026</span>
            <span className="footer-link">Contact Us</span>
          </div>
        </div>
      </footer>

      <ProjectBot />
    </div>
  );
}

export default App;
