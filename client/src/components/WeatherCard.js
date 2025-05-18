import React from "react";
import "./WeatherCard.css";

function WeatherCard({ data, favoriteCities = [], setFavoriteCities }) {
  const city = data.name;
  const isFavorite = favoriteCities.some((c) => c.name === city);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoriteCities(favoriteCities.filter((c) => c.name !== city));
    } else {
      setFavoriteCities([...favoriteCities, data]);
    }
  };

  const getLocalHour = () => {
    const utcSeconds = data.dt + data.timezone; // Add timezone offset (in seconds)
    const localDate = new Date(utcSeconds * 1000); // Convert to ms
    return localDate.getUTCHours(); // Use getUTCHours to get correct local hour
  };

  const getEmoji = () => {
    const hour = getLocalHour();
    const weather = data.weather[0].main.toLowerCase();

    if (weather.includes("cloud")) return "⛅";
    if (weather.includes("rain")) return "🌧️";
    if (weather.includes("snow")) return "❄️";
    if (hour >= 6 && hour < 18) return "☀️";
    return "🌙";
  };

  const getTimeOfDay = () => {
    const hour = getLocalHour();

    if (hour >= 5 && hour < 12) return "morning";
    else if (hour >= 12 && hour < 17) return "afternoon";
    else if (hour >= 17 && hour < 20) return "evening";
    else return "night";
  };

  const timeOfDay = getTimeOfDay();

  return (
    <div className={`weather-card ${timeOfDay}`}>
      <h2>
        {city}, {data.sys.country}
      </h2>
      <p className="description">{data.weather[0].description}</p>
      <p>Temp: {Math.round(data.main.temp)}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} km/h</p>
      <p><strong>Time of Day:</strong> {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</p>

      <button
        onClick={toggleFavorite}
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "❤️" : "🤍"} {getEmoji()}
      </button>
    </div>
  );
}

export default WeatherCard;
