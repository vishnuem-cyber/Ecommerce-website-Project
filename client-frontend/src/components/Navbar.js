// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Snap N Shop</h1>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/" style={{ color: 'white' }}>Home</Link></li>
        <li><Link to="/login" style={{ color: 'white' }}>Login</Link></li>
        <li><Link to="/cart" style={{ color: 'white' }}>Cart</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;




      
  