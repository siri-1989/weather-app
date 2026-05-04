import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");
      setWeather(null);

      const res = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await res.json();

      const current = data.current_condition[0];

      setWeather({
        name: city,
        temp: current.temp_C,
        desc: current.weatherDesc[0].value,
        humidity: current.humidity,
      });

    } catch (err) {
      setError("Failed to fetch weather");
    }
  };

return (
  <div className="app">
    <div className="container">
      <h1 className="title">🌊 WeatherX</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>
          <h1 className="temp">{weather.temp}°C</h1>
          <p className="desc">{weather.desc}</p>
          <p className="humidity">💧 {weather.humidity}% humidity</p>
        </div>
      )}
    </div>
  </div>
);
}

export default App;