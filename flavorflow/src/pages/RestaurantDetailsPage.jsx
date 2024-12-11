import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRestaurantDetails } from '../utils/fetchRestaurants';
import '../styles/RestaurantDetailsPage.css';
import GoogleMapReact from 'google-map-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import loaderGif from '../assets/loader_food.gif';
import placeholderImage from '../assets/placeholder-image.jpg';
import axios from 'axios';

function RestaurantDetailsPage({setIsLoggedIn, isLoggedIn}) {
  const { place_id } = useParams(); // Extract place_id from URL
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  //console.log('useParams() returned place_id:', place_id);

  useEffect(() => {
    const token = localStorage.getItem('token');
    //console.log('Token found:', !!token); // Debug log
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!place_id) {
      console.error('place_id is undefined in RestaurantDetailsPage.');
      setError('Invalid place_id');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      //console.log('Fetching restaurant details for place_id:', place_id);
      try {
        const response = await fetchRestaurantDetails(place_id);
        if (response.result) {
          setRestaurantDetails(response.result);
        } else {
          setError('Error fetching restaurant details.');
        }
      } catch (err) {
        setError('Error fetching restaurant details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [place_id]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (isLoggedIn && place_id) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/user/saved-restaurants', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsSaved(response.data.some(restaurant => restaurant.place_id === place_id));
        } catch (error) {
          console.error('Error checking saved status:', error);
        }
      }
    };
    checkIfSaved();
  }, [isLoggedIn, place_id]);

  if (loading) {
    return <div className= "loader-container">
      <img src={loaderGif} alt="Loading..." id='loading'/>
    </div>;
  }

  if (!restaurantDetails && error) {
    return <p className="error-message">{error}</p>;
  }

  const {
    name,
    formatted_address,
    formatted_phone_number,
    opening_hours,
    photos,
    geometry,
    reviews,
    serves_beer,
    serves_breakfast,
    serves_dinner,
    serves_lunch,
    serves_wine,
    takeout,
    delivery,
    dine_in,
    wheelchair_accessible_entrance,
    editorial_summary,
    website,
  } = restaurantDetails || {};

  const renderPhotos = () => {
    if (!photos || photos.length === 0) return null;
  
    const photoUrls = photos.map(
      (photo) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8`
    );
  
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
  
    return (
      <div className="carousel-container">
        <Carousel infinite autoPlay autoPlaySpeed={3000} responsive={responsive}>
          {photoUrls.map((url, index) => (
            <img key={index} src={url} alt={`Photo ${index + 1}`} className="restaurant-photo" />
          ))}
        </Carousel>
      </div>
    );
  };
  
  

  const renderReviews = () => {
    if (!reviews || reviews.length === 0) return <p>No reviews available.</p>;
  
  
    return reviews.map((review, index) => (
      //console.log("Image URL:", review.profile_photo_url),

      <div key={index} className="review">
        <img
          src={review.profile_photo_url} alt={review.author_name} className="review-author-photo"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = placeholderImage; // Use a placeholder for broken images
          }}
          onLoad={(e) => {
            e.target.style.display = "block"; // Ensure the image is displayed once loaded
          }}
          style={{ display: "none" }} // Hide the image until fully loaded
        />
        <div>
          <h4>{review.author_name}</h4>
          <p>{review.relative_time_description}</p>
          <p>Rating: {review.rating}</p>
          <p>{review.text}</p>
        </div>
      </div>
    ));
  };
  

  const renderMap = () => {
    if (!geometry) return null;

    return (
      <div className="details-map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8' }}
          defaultCenter={geometry.location}
          defaultZoom={15}
        >
          <div lat={geometry.location.lat} lng={geometry.location.lng} className="map-marker" />
        </GoogleMapReact>
      </div>
    );
  };

  const handleSaveRestaurant = async () => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (isSaved) {
        // Delete the restaurant if it's already saved
        await axios.delete(`http://localhost:5000/user/saved-restaurants/${place_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsSaved(false);
      } else {
        // Save the restaurant if it's not saved
        await axios.post('http://localhost:5000/user/saved-restaurants', {
          restaurant: {
            place_id: restaurantDetails.place_id,
            name: restaurantDetails.name,
            vicinity: restaurantDetails.formatted_address,
            rating: restaurantDetails.rating,
            user_ratings_total: restaurantDetails.user_ratings_total,
            photos: restaurantDetails.photos,
            opening_hours: restaurantDetails.opening_hours
          }
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to save/unsave restaurant:', error);
    }
  };

  return (
    <div className="more-restaurant-details">
      <div className="details-main">
        <div className="details-photos">{renderPhotos()}</div>
        <div className="details-info">
          <h1>{name}</h1>
          <p>{formatted_address}</p>
          {opening_hours && opening_hours.weekday_text && (
            <div className="opening-hours">
              <h4>Opening Hours</h4>
              <ul>
                {opening_hours.weekday_text.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
            </div>
          )}
          {website && <p> <a href={restaurantDetails.website} target="_blank" rel="noopener noreferrer">Visit Website</a></p>}
          
          <p>Phone Number: {formatted_phone_number}</p>
          <button 
            className="save-button" 
            onClick={() => {
              //console.log('Button clicked, isLoggedIn:', isLoggedIn); // Debug log
              handleSaveRestaurant();
            }}
            title={!isLoggedIn ? "Please log in to save restaurants" : ""}
          >
            {!isLoggedIn ? 'Log in to Save' : (isSaved ? 'Unsave Restaurant' : 'Save Restaurant')}
          </button>
          {editorial_summary && <p id="summary">{editorial_summary.overview}</p>}
        </div>
      </div>

      <div className="details-extras">
        <h3>Details</h3>
        <ul>
          <li>Delivery: {delivery ? 'Yes' : 'No'}</li>
          <li>Dine-In: {dine_in ? 'Yes' : 'No'}</li>
          <li>Takeout: {takeout ? 'Yes' : 'No'}</li>
          <li>Wheelchair Accessible: {wheelchair_accessible_entrance ? 'Yes' : 'No'}</li>
          <li>Beer: {serves_beer ? 'Yes' : 'No'}</li>
          <li>Breakfast: {serves_breakfast ? 'Yes' : 'No'}</li>
          <li>Lunch: {serves_lunch ? 'Yes' : 'No'}</li>
          <li>Dinner: {serves_dinner ? 'Yes' : 'No'}</li>
          <li>Wine: {serves_wine ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      {renderMap()}

      <div className="reviews-section">
        <h3>Reviews</h3>
        <div className="add-review">
          <h4>Add Your Review</h4>
          <form>
            <textarea placeholder="Write your review here..." rows="5" />
            <button type="submit">Submit Review</button>
          </form>
        </div>
        {renderReviews()}
      </div>
    </div>
  );
}

export default RestaurantDetailsPage;
