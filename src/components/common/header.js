import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header p-3">
      <h1 className="title">Retro Pixel Workshop</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/playnow" className="nav-link">Play Now</Link>        
      </nav>
    </header>
  );
}

export default Header;
