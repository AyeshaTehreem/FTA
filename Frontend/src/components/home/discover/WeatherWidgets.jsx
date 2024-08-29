import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [location, setLocation] = useState("Loading...");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [currentLocation, setCurrentLocation] = useState(null);

  const apiKey = '37d85c40a401f08f1670535f7412012f'; // Replace with your actual OpenWeatherMap API key

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Failed to get location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }

    // Update date
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleDateString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchLocation(currentLocation.lat, currentLocation.lon);
      fetchWeather(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation]);

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      setLocation(data.city || data.locality || data.countryName);
    } catch (error) {
      setLocation("Unknown Location");
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=5&appid=${apiKey}`
      );
      const data = response.data;
      setWeather(data.list[0]);
      setForecast(data.list);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  if (loading) return <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">Loading...</div>;
  if (error) return <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">{error}</div>;

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-4xl font-bold mb-1">{Math.round(weather.main.temp)}°C</h4>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-sm">{location}</p>
        </div>
        <img src={getWeatherIcon(weather.weather[0].icon)} alt="weather icon" className="h-16 w-16" />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-4 text-sm">
        {forecast.map((day, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
            <div>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <img src={getWeatherIcon(day.weather[0].icon)} alt="weather icon" className="mx-auto my-2 h-8 w-8" />
            <div className="text-xl font-bold">{Math.round(day.main.temp)}°C</div>
            <div>{day.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
