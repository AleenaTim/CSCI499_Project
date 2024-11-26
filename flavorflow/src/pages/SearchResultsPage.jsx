import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants, fetchNextPageResults } from '../utils/fetchRestaurants';
import '../styles/SearchResultsPage.css';
import loaderGif from '../assets/loader_food.gif';

function SearchResultsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
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
            const results = await fetchRestaurants(location, 1000, keyword);
            setRestaurants(results.results || []);
            setNextPageToken(results.next_page_token || null);
            if (!results.next_page_token) {
              console.log('No next page token found');
            }
        };
        fetchData();
    }
  }, [location, keyword]);

  const handleViewMore = async () => {
    if (!nextPageToken) return;
  
    try {
      const nextPageResults = await fetchNextPageResults(nextPageToken);
      setRestaurants((prevRestaurants) => [...prevRestaurants, ...nextPageResults.results]);
      setNextPageToken(nextPageResults.nextPageToken);
    } catch (error) {
      console.error('Error fetching next page results:', error);
    }
  };

  return (
    <div>
      <div className="search-bar-container">
        <SearchBar setRestaurants={setRestaurants} location={location} />
      </div>
      <div className={restaurants.length > 0 ? "restaurant-list" : "loader-container"}>
        {restaurants.length > 0 ? (
          <>
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
            {restaurants.length > 0 && nextPageToken && (
              <button onClick={handleViewMore} className="view-more-button">View More</button>
            )}
          </>
        ) : (
          <img src={loaderGif} alt="loading" id='loading' />
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
