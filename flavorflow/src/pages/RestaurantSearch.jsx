import React from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import '../styles/RestaurantSearch.css';

function RestaurantSearch() {
  const searchParams = new URLSearchParams(useLocation().search);
  const keyword = searchParams.get('keyword');
  
  // Assume restaurants state is coming from some API call (similar to HomePage)
  const restaurants = []; // Placeholder for fetched data
  
  return (
    <div className="restaurant-search-page">
      <h2>Search Results for: "{keyword}"</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantSearch;
