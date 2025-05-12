// Navbar.tsx
import React from "react";
import '../css/Navbar.css'; // You can change this to '../css/Navbar.css' if separating styles

export function Navbar() {
  return (
    <header className="custom-navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Brighte Eats</h1>
        <nav className="navbar-actions">
          {/* Optional buttons or links can go here */}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
