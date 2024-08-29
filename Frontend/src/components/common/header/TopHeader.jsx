import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./TopHeader.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported

const TopHeader = () => {
  const [location, setLocation] = useState("Loading...");
  const [weather, setWeather] = useState("Loading...");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude);
        fetchWeather(latitude, longitude);
      });
    }

    // Update date
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleDateString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      setWeather(`${data.current_weather.temperature}°C`);
    } catch (error) {
      setWeather("Unknown Weather");
    }
  };

  return (
    <div className="topHeader">
      <div className="container">
        <div className="left">
          <span className="location">
            <i className="fas fa-location-dot"></i> {location}
          </span>
          <span className="weather">
            <i className="fas fa-cloud-sun"></i> {weather}
          </span>
          <span className="date">
            <i className="fas fa-calendar-day"></i> Today ({date})
          </span>
        </div>
        <div className="right">
          <div className="right-content">
            <Link to="/login" className="loginRegister">Login/Register</Link>
            <span className="language">English</span>
          </div>
          <div className="socialIcons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
