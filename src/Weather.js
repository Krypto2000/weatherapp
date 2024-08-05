import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './index.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Karachi');
  const [units, setUnits] = useState('metric');

  const API_KEY = '50e011a9acc81ee3ed08622ff8255a25';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=${units}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [city, units]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleUnitsChange = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <input type="text" value={city} onChange={handleCityChange} />
        <button onClick={fetchWeatherData}>Get Weather</button>
        <button onClick={handleUnitsChange}>
          Switch to {units === 'metric' ? 'Imperial' : 'Metric'}
        </button>
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <h3>{weatherData.weather[0].description}</h3>
            <h1>{weatherData.main.temp}°{units === 'metric' ? 'C' : 'F'}</h1>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
