import React from 'react';
import {  } from 'react-router-dom';
import '../styles/Footer.css'; // Assuming you have a CSS file for styling

function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
      <p className="text-center">© {new Date().getFullYear()} Snap N Shop. All rights reserved.</p>
    </footer>
  );
}


export default Footer;
