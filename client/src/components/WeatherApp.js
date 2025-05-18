import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import FavoriteCities from "./FavoriteCities";

function WeatherApp() {
  const [city, setCity] = useState("Pune"); // default city
  const [weatherData, setWeatherData] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
        setWeatherData(res.data);
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeatherData(null);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      {weatherData && (
        <WeatherCard
          data={weatherData}
          favoriteCities={favoriteCities}
          setFavoriteCities={setFavoriteCities}   /* Make sure this is here */
        />
      )}
      <FavoriteCities
        favoriteCities={favoriteCities}
        setFavoriteCities={setFavoriteCities}   /* And here */
      />
    </div>
  );
}

export default WeatherApp;
