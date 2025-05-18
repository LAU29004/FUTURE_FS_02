import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroPage.css";

function HeroPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="hero-container">
      {/* Add a content wrapper for padding */}
      <div className="hero-content">
        <h1>Welcome to Weather Dashboard</h1>
        <p>
          This project provides real-time weather updates for your current
          location and cities you search. You can also mark your favorite cities
          and view their weather quickly!
        </p>
        <button onClick={handleGetStarted} className="hero-button">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default HeroPage;
