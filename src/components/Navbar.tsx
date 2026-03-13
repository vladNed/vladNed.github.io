import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const { pathname } = useLocation();
  const isBlog = pathname.startsWith('/blog');

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link ${!isBlog ? 'active' : ''}`}>
        ~/home
      </Link>
      <Link to="/blog" className={`nav-link ${isBlog ? 'active' : ''}`}>
        ~/blog
      </Link>
    </nav>
  );
}
