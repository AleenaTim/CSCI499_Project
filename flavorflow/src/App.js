import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MeetTheTeam from './pages/MeetTheTeam';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchResultsPage from './pages/SearchResultsPage'; // Import new page
import Layout from './components/Layout';
import Map from './pages/MapPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </Layout>
            }
          />
          <Route
            path="/map"
            element={
              <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <Map />
              </Layout>
            }
          />
          <Route
            path="/meet-the-team"
            element={
              <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <MeetTheTeam />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <SignUpPage setIsLoggedIn={setIsLoggedIn} />
              </Layout>
            }
          />
          <Route
            path="/search-results"
            element={
              <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <SearchResultsPage />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
