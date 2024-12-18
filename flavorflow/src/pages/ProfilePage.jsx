import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';
import loaderGif from '../assets/loader_food.gif';
import RestaurantCard from '../components/RestaurantCard';
import { ToastContainer, toast } from 'react-toastify';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [savedRestaurants, setSavedRestaurants] = useState([]);

  const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://flavorflow-ovph.onrender.com' 
  : 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        const restaurantsResponse = await axios.get(`${BASE_URL}/user/saved-restaurants`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedRestaurants(restaurantsResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to fetch user data. Please log in again.')
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="loader-container">
      <img src={loaderGif} alt="Loading..." id='loading'/>
    </div>;
  }

  const handleUnsaveRestaurant = async (place_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`BASE_URL/user/saved-restaurants/${place_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update the state to remove the unsaved restaurant
      setSavedRestaurants(savedRestaurants.filter(restaurant => restaurant.place_id !== place_id));
    } catch (error) {
      console.error('Failed to unsave restaurant:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.banner}></div>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}></div>
          <div className={styles.name}>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <p className={styles.username}>@{user.username}</p>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.mainContent}>
          <div className={styles.favorites}>
              <div className={styles.mainContent}>
                <h2>Saved Restaurants</h2>
                {savedRestaurants.length > 0 ? (
                  <div className={styles.restaurantGrid}>
                    {savedRestaurants.map((restaurant) => (
                      <div key={restaurant.place_id} className={styles.restaurantCardWrapper}>
                        <RestaurantCard restaurant={restaurant} />
                        <button 
                          onClick={() => handleUnsaveRestaurant(restaurant.place_id)}
                          className={styles.unsaveButton}
                        >
                          Unsave Restaurant
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No saved restaurants yet. Start exploring to save your favorites!</p>
                )}
              </div>

            <ul className={styles.favoritesRestaurant}>
              <h2>Statistics</h2>
              <li>
                Total Saved
                <h4>{savedRestaurants.length} restaurants</h4>
              </li>
              {savedRestaurants.length > 0 && (
                <li>
                  Average Rating
                  <h4>
                    {(savedRestaurants.reduce((acc, rest) => acc + (rest.rating || 0), 0) / 
                    savedRestaurants.length).toFixed(1)} ⭐
                  </h4>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.reviews}>
            <h2>Recent Activity</h2>
            {savedRestaurants.slice(0, 3).map(restaurant => (
              <div key={restaurant.place_id} className={styles.reviewCard}>
                <div className={styles.reviewInfo}>
                  <div className={styles.avatarSmall}></div>
                  <div className={styles.reviewRestaurantInfo}>
                    <h3>{restaurant.name}</h3>
                    <p>Rating: {restaurant.rating ? '⭐'.repeat(Math.round(restaurant.rating)) : 'No rating'}</p>
                    <p>{restaurant.vicinity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;