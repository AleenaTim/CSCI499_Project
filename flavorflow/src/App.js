import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantSearch from './pages/RestaurantSearch'; // Optional if you have a detailed results page
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Restaurant Search Page - Optional for more detailed listings */}
          <Route path="/search" element={<RestaurantSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
