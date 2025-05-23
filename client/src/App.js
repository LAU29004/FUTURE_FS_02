import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import WeatherCard from "./components/WeatherCard";
import FavoriteCities from "./components/FavoriteCities";
import HeroPage from "./components/HeroPage";

function AppContent() {
  const location = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [favoriteCities, setFavoriteCities] = useState([]);

  // Use the correct environment variable for the backend URL, strip trailing slash if present
  const BASE_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

  // Optional: Warn if backend URL is missing
  if (!BASE_URL) {
    console.warn("REACT_APP_BACKEND_URL is not set in your environment variables.");
  }

  // Wrap fetchWeather in useCallback so it's stable across renders
  const fetchWeather = useCallback(
    async (city) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
        );
        setWeatherData(response.data);
      } catch (err) {
        console.error("Error fetching weather", err);
      }
    },
    [BASE_URL]
  );

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await axios.get(
            `${BASE_URL}/api/weather?lat=${latitude}&lon=${longitude}`
          );
          setWeatherData(response.data);
        } catch (err) {
          console.error("Error fetching geo weather", err);
        }
      });
    }
  }, [selectedCity, BASE_URL, fetchWeather]);

  const handleSearch = () => {
    if (searchCity.trim()) {
      setSelectedCity(searchCity);
      setSearchCity("");
    }
  };

  const showLayout = location.pathname !== "/"; // Only show layout on dashboard and favorites

  return (
    <div className="app">
      {showLayout && <Navbar />}
      <div className="content-wrapper">
        {showLayout && (
          <aside className="sidebar">
            <Sidebar />
          </aside>
        )}

        <main className="main-content">
          {showLayout && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          )}

          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route
              path="/dashboard"
              element={
                weatherData ? (
                  <WeatherCard
                    data={weatherData}
                    favoriteCities={favoriteCities}
                    setFavoriteCities={setFavoriteCities}
                  />
                ) : (
                  <p>Search City....</p>
                )
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoriteCities
                  favoriteCities={favoriteCities}
                  setFavoriteCities={setFavoriteCities}
                  setSelectedCity={setSelectedCity}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;