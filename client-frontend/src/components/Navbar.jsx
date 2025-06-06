import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Snap N Shop</h1>
        <ul className="nav-links">
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/stories">Stories</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Search" className="search-bar" />
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          🛒<span className="cart-count">3</span>
        </Link>
        <Link to="/login" className="login-link">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
