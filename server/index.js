const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware to allow cross-origin requests (CORS)
const cors = require("cors");
app.use(cors());

// Root route for sanity check
app.get("/", (req, res) => {
  res.send("Weather Dashboard Server is running!");
});

// Weather API route
app.get("/api/weather", async (req, res) => {
  const { city, lat, lon } = req.query;

  let url = "";

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  }

  if (!url) {
    return res.status(400).json({ error: "City or location is required" });
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching weather:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
