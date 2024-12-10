import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import Map from './MapPage';
import loaderGif from '../assets/loader_food.gif';
import '../styles/HomePage.css';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLoading(false)
        },
        (err) => {
          setError('Unable to fetch location. Please enable GPS.');
          console.error(err);
          setLoading(false)
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false)
    }
  }, []);

  return (
    <div>
      
      <div className="hero-section">
        <Carousel />
        <SearchBar setRestaurants={setRestaurants} location={location} />
      </div>
      {loading ? (
        <div className="loader-container">
          <img src={loaderGif} alt="loading" id='loading' />
        </div>
      ) : (
        location && (
          <div className="map-container">
            <Map center={location} restaurants={restaurants} />
          </div>
        )
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

    </div>
  );
}

export default HomePage;
