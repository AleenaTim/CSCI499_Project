import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import Map from './MapPage';

import '../styles/HomePage.css';  

function HomePage() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setError('Unable to fetch location. Please enable GPS.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // // Fetch restaurants based on user's location
  // useEffect(() => {
  //   if (location) {
  //     const fetchData = async () => {
  //       const results = await fetchRestaurants(location, 500, '');
  //       setRestaurants(results);
  //     };
  //     fetchData();
  //   }
  // }, [location]);

  return (
    <div>
      <div className="hero-section">
        <Carousel />
        <SearchBar setRestaurants={setRestaurants} location={location} />
      </div>
      {location && (
        <div className="map-container">
          <Map center={location} restaurants={restaurants} />
        </div>
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

    </div>
  );
}

export default HomePage;
