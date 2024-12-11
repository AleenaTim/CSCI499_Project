import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '..styles/ProfilePage.module.css'; // Import the CSS Module

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
        <div className={styles.badges}>
          <ul>
            <li>⭐ Top Reviewer</li>
            <li>📅 3-year Veteran</li>
          </ul>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.mainContent}>
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className={styles.mainContentTop}>
            <div className={styles.bio}>
              <h2>About Me</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel veritatis id consectetur illum labore aliquam quo asperiores enim ipsum, consequatur minus, explicabo nemo reiciendis eum maiores ullam iusto, hic fugit.</p>
              <form className={styles.editButton} action="">
                <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg></button>
              </form>
            </div>
            <div className={styles.contributionsBox}>
              <div className={styles.contributions}>
                <h2>771 contributions in the last year</h2>
                <div className={styles.contributionGraph}>
                  {/* Placeholder for contribution graph */}
                </div>
              </div>
            </div>
            <div className={styles.funQuestion}>
              <h2>My last meal would be...</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel veritatis id consectetur illum labore aliquam quo asperiores enim ipsum, consequatur minus, explicabo nemo reiciendis eum maiores ullam iusto, hic fugit.</p>
              <form className={styles.editButton} action="">
                <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg></button>
              </form>
            </div>
          </div>


          <div className={styles.favorites}>
            {/* <h2>Top Favorite Cuisines</h2> */}
            <ul className={styles.favoritesCuisine}>
              <h2>Favorite Cuisines</h2>
              <li>Korean</li>
              <li>German</li>
              <li>Caribbean</li>
            </ul>
            {/* <br />
            <br /> */}
            {/* <h2>Top Favorite Restaurants</h2> */}
            <ul className={styles.favoritesRestaurant}>
              <h2>Favorite Restaurants</h2>
              <li>Coqodaq <h4>New York, USA</h4></li>
              <li>Ochre<h4>London, United Kingdom</h4></li>
              <li>Cut & Barrel<h4>Budapest, Hungary</h4></li>
            </ul>


          </div>




          <div className={styles.reviews}>
            <h2>Most Popular Reviews</h2>
            <div className={styles.reviewCard}>
              <div className={styles.reviewInfo}>
                <div className={styles.avatarSmall}></div>
                <div className={styles.reviewRestaurantInfo}>
                  <h3>Cho Dang Gol</h3>
                  <p>Rating: ⭐⭐⭐⭐⭐</p>
                  <p>Price Range: $30-$50</p>
                </div>
                <p className={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <p className={styles.likes}>1250 people liked this</p>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewInfo}>
                <div className={styles.avatarSmall}></div>
                <div className={styles.reviewRestaurantInfo}>
                  <h3>Cho Dang Gol</h3>
                  <p>Rating: ⭐⭐⭐⭐⭐</p>
                  <p>Price Range: $30-$50</p>
                </div>
                <p className={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <p className={styles.likes}>1250 people liked this</p>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewInfo}>
                <div className={styles.avatarSmall}></div>
                <div className={styles.reviewRestaurantInfo}>
                  <h3>Cho Dang Gol</h3>
                  <p>Rating: ⭐⭐⭐⭐⭐</p>
                  <p>Price Range: $30-$50</p>
                </div>
                <p className={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <p className={styles.likes}>1250 people liked this</p>
            </div>
          </div>
        </div>

        {/* <div className={styles.sidebar}> */}
        {/* <div className={styles.badges}>
            <h2>Badges</h2>
            <ul>
              <li>⭐ Top Reviewer</li>
              <li>📅 3-year Veteran</li>
            </ul>
          </div> */}

        {/* <div className={styles.contributions}>
            <h2>771 contributions in the last year</h2>
            <div className={styles.contributionGraph}> */}
        {/* Placeholder for contribution graph */}
        {/* </div>
          </div> */}
        {/* </div> */}

      </div>
    </div>
  );
};

export default ProfilePage;
