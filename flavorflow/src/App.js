import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantSearch from './components/RestaurantSearch';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Restaurant Search Page */}
          <Route path="/search" element={<RestaurantSearch />} />

          {/* Redirect to /search by default if no other route matches */}
          <Route path="*" element={<RestaurantSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
