import React, { useState } from 'react';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import '../styles/SearchBar.css';

function SearchBar({ setRestaurants, location }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() !== '' && location) {
      const results = await fetchRestaurants(location, 5000, query);
      setRestaurants(results);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Things to do, restaurants..."
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default SearchBar;
