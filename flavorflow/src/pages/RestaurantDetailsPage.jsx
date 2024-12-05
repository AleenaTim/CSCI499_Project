import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRestaurantDetails } from '../utils/fetchRestaurants';
import '../styles/RestaurantDetailsPage.css';

function RestaurantDetailsPage() {
  const { place_id } = useParams(); // Extract place_id from URL
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchRestaurantDetails(place_id);
        setRestaurantDetails(response.result);
      } catch (err) {
        setError('Error fetching restaurant details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [place_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="restaurant-details-page">
      <h1>{restaurantDetails.name}</h1>
      {restaurantDetails.photos && restaurantDetails.photos.length > 0 && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${restaurantDetails.photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`}
          alt={restaurantDetails.name}
        />
      )}
      <p><strong>Address:</strong> {restaurantDetails.formatted_address}</p>
      <p><strong>Phone:</strong> {restaurantDetails.formatted_phone_number}</p>
      <p><strong>Rating:</strong> {restaurantDetails.rating} ({restaurantDetails.user_ratings_total} reviews)</p>
      {restaurantDetails.opening_hours && (
        <div>
          <h3>Opening Hours:</h3>
          <ul>
            {restaurantDetails.opening_hours.weekday_text.map((hours, index) => (
              <li key={index}>{hours}</li>
            ))}
          </ul>
        </div>
      )}
      {restaurantDetails.website && (
        <p><a href={restaurantDetails.website} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
      )}
      <div id="restaurant-map" style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
}

export default RestaurantDetailsPage;
