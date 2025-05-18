import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; 
function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Favorite Cities
      </NavLink>
    </div>
  );
}

export default Sidebar;
