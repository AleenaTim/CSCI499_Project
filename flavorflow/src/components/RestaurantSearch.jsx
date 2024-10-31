import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import '../styles/RestaurantSearch.css'; 

function RestaurantSearch() {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const keyword = searchParams.get('keyword');

  // Get the user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError('Permission denied. Please enable location services.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('Position unavailable. Please check your network or GPS.');
              break;
            case err.TIMEOUT:
              setError('The request to get location timed out. Please try again.');
              break;
            default:
              setError('An unknown error occurred while fetching your location.');
              break;
          }
          console.error('Error getting location:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch restaurants based on location and keyword
  useEffect(() => {
    if (location && keyword) {
      const fetchData = async () => {
        const results = await fetchRestaurants(location, 5000, keyword);
        setRestaurants(results);
      };
      fetchData();
    }
  }, [location, keyword]);

  // Function to get the photo URL
  const getImageUrl = (photoReference) => {
    const API_KEY = 'AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8'; 
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
  };

  // Handle form submission to search for new keyword
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="restaurant-search-container">
      <h2>Search for Restaurants</h2>
      
      {/* Form for searching restaurants */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter food type..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!location && !error && <p>Getting your location...</p>}

        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          <div className="restaurant-list">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="restaurant-card">
                {restaurant.photos && restaurant.photos.length > 0 && (
                  <img
                    src={getImageUrl(restaurant.photos[0].photo_reference)}
                    alt={`${restaurant.name}`}
                    className="restaurant-image"
                  />
                )}
                <div className="restaurant-details">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-address">{restaurant.vicinity}</p>
                  {restaurant.rating && (
                    <p className="restaurant-rating">
                      Rating: {restaurant.rating} ({restaurant.user_ratings_total} ratings)
                    </p>
                  )}
                  {restaurant.opening_hours?.open_now && (
                    <p className="restaurant-open-now">Currently Open</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && location && <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantSearch;
