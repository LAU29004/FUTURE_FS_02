import React from "react";
import WeatherCard from "./WeatherCard";

function FavoriteCities({ favoriteCities = [], setFavoriteCities }) {
  const removeCity = (cityName) => {
    setFavoriteCities(favoriteCities.filter((c) => c.name !== cityName));
  };

  return (
    <div>
      <h2>Favorite Cities</h2>
      {favoriteCities.length === 0 && <p>No favorite cities yet.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {favoriteCities.map((cityData) => (
          <div key={cityData.name} style={{ position: "relative" }}>
            <WeatherCard
              data={cityData}
              favoriteCities={favoriteCities}
              setFavoriteCities={setFavoriteCities}
            />
            <button
              onClick={() => removeCity(cityData.name)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "2px 6px",
                borderRadius: "0 0 0 6px",
                fontWeight: "bold",
              }}
              aria-label={`Remove ${cityData.name} from favorites`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;
