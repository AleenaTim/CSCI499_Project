import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css'; // Import the CSS Module

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios
      .get('http://localhost:5001/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(() => {
        alert('Failed to fetch user data. Please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.banner}></div>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}></div>
          <div className={styles.name}>
            <h1>
              John Doe <span className={styles.verified}>✔</span>
            </h1>
            <p className={styles.username}>{user.email}{user.password}{user.firstName}</p>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.mainContent}>
          <div className={styles.favorites}>
            <h2>Top Favorite Cuisines</h2>
            <ul>
              <li>✔ Korean</li>
              <li>✔ German</li>
              <li>✔ Caribbean</li>
            </ul>
            <br />
            <br />
            <h2>Top Favorite Restaurants</h2>
            <ul>
              <li>✔ Mikado</li>
              <li>✔ Heidelberg</li>
              <li>✔ Court Square Diner</li>
            </ul>
          </div>

          <div className={styles.reviews}>
            <h2>Most Popular Reviews</h2>
            <div className={styles.reviewCard}>
              <div className={styles.reviewInfo}>
                <div className={styles.avatarSmall}></div>
                <div>
                  <h3>Cho Dang Gol</h3>
                  <p>Rating: ⭐⭐⭐⭐⭐</p>
                  <p>Price Range: $30-$50</p>
                </div>
              </div>
              <p className={styles.reviewText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className={styles.likes}>1250 people liked this</p>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.badges}>
            <h2>Badges</h2>
            <ul>
              <li>⭐ Top Reviewer</li>
              <li>📅 3-year Veteran</li>
            </ul>
          </div>

          <div className={styles.contributions}>
            <h2>771 contributions in the last year</h2>
            <div className={styles.contributionGraph}>
              {/* Placeholder for contribution graph */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
