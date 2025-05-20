import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={`${process.env.PUBLIC_URL}/images/Navbar.png`} alt="Navbar" className="navbar-image" />
      </div>
      <h1 className="navbar-title">Weather Dashboard</h1>
    </nav>
  );
}

export default Navbar;
