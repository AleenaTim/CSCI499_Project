import React from 'react';
import '../styles/RestaurantCard.css';

function RestaurantCard({ restaurant }) {
  // console.log('RestaurantCard Props:', restaurant);
  const getImageUrl = (photoReference) => {
    const API_KEY = 'AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
  };

  const handleCardClick = () => {
    window.location.href = `/restaurant/${restaurant.place_id}`;
  };

  return (
    
    <div className="restaurant-card" onClick={handleCardClick}>
      {restaurant.photos && restaurant.photos.length > 0 && (
        <img
          src={getImageUrl(restaurant.photos[0].photo_reference)}
          alt={`${restaurant.name}`}
          className="restaurant-image"
        />
      )}
      <div className="restaurant-details">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.vicinity}</p>
        {restaurant.rating && (
          <p className="restaurant-rating">
            Rating: {restaurant.rating} ({restaurant.user_ratings_total} reviews)
          </p>
        )}
        {restaurant.opening_hours ? (
            restaurant.opening_hours.open_now ?(
                <p className="restaurant-open-now">Currently Open</p>
                ) : (
                    <p className="restaurant-closed">Not Open</p>
                )
            ) : (
                <p className="restaurant-unknown-status">Opening hours not available</p>
            )}
      </div>
    </div>
  );
}

export default RestaurantCard;
