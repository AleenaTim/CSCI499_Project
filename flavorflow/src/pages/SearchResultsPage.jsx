import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import '../styles/SearchResultsPage.css';

function SearchResultsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const searchParams = new URLSearchParams(useLocation().search);
  const keyword = searchParams.get('keyword');

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error('Unable to fetch location. Please enable GPS.');
        }
      );
    }
  }, []);

  // Fetch restaurants based on keyword and location
  useEffect(() => {
    if (location && keyword) {
      const fetchData = async () => {
        const results = await fetchRestaurants(location, 5000, keyword);
        setRestaurants(results);
      };
      fetchData();
    }
  }, [location, keyword]);

  return (
    <div>
      <div className="search-bar-container">
        <SearchBar setRestaurants={setRestaurants} location={location} />
      </div>
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        ) : (
          <p>No results found. Please try searching again.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
