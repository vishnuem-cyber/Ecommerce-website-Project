import React from 'react';
import {  } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Snap N Shop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
