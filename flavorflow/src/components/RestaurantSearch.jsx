import React, { useState } from 'react';
import { fetchRestaurants } from '../utils/fetchRestaurants';  // Import the function

function RestaurantSearch() {
  const [query, setQuery] = useState('');           // User's search query (e.g., "pizza")
  const [restaurants, setRestaurants] = useState([]);  // Stores the search results
  const [locationId, setLocationId] = useState('297704');  // Location ID for Paris as an example

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetchRestaurants(locationId, query); // Call the fetch function with the location and query
    setRestaurants(results);  // Update the state with the fetched results
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for food..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {restaurants.length > 0 ? (
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p> {/* Adjust based on API response */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantSearch;
