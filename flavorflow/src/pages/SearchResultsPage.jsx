import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants, fetchNextPageResults } from '../utils/fetchRestaurants';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/SearchResultsPage.css';
import loaderGif from '../assets/loader_food.gif';

function SearchResultsPage({filterValueSearch}) {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const searchParams = new URLSearchParams(useLocation().search);
  const keyword = searchParams.get('keyword');

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error('Unable to fetch location. Please enable GPS.');
        }
      );
    }
  }, []);
  useEffect(() => {
    if (location && keyword) {
      const fetchData = async () => {
        let filteredResults1 = [];
        const results = await fetchRestaurants(location, 1500, keyword);
        if(filterValueSearch.length != 0){
            filteredResults1 = results.results.filter((restaurant) => 
            {
              for(let i =0; i < filterValueSearch.length; i++){
                  if(filterValueSearch[i][1] == "rating"){
                    if(restaurant.rating < filterValueSearch[i][0]){
                      return false; 
                    }
                  }
                  if(restaurant.opening_hours){
                    if(filterValueSearch[i][0] == "open-now" && restaurant.opening_hours.open_now== false){
                      return false; 
                    }
                  } 
                  if(filterValueSearch[i][0] == "offers-delivery" && (restaurant.types.includes("meal_delivery") != true)){
                      return false; 
                  }
                  if(filterValueSearch[i][0] == "offers-takeout" && (restaurant.types.includes("meal_takeaway") != true)){
                      return false; 
                    }      
                  }
                    return true; 
            }); 
        }

        if(filteredResults1.length == 0 && filterValueSearch.length != 0 ){
             const failedFilters = filterValueSearch.map(filter => filter[0]).join(', ');
             toast.error(`No results found with the selected filters: ${failedFilters}`);
        }
            let useResults = filteredResults1.length === 0 ? results.results : filteredResults1; 
            setRestaurants( useResults|| []); 
            setNextPageToken(results.next_page_token || null);
            if (!results.next_page_token) {
              console.log('No next page token found');
            }
        };
        fetchData();
    }
  }, [location, keyword, filterValueSearch]);

  const handleViewMore = async () => {
    if (!nextPageToken) return;
  
    try {
      const nextPageResults = await fetchNextPageResults(nextPageToken);
      setRestaurants((prevRestaurants) => [...prevRestaurants, ...nextPageResults.results]);
      setNextPageToken(nextPageResults.nextPageToken);
    } catch (error) {
      console.error('Error fetching next page results:', error);
    }
  };

  return (
    <>
    <div>

      <div className="search-bar-container">
        <SearchBar setRestaurants={setRestaurants} location={location} />
      </div>
      <div className={restaurants.length > 0 ? "restaurant-list" : "loader-container"}>
        {restaurants.length > 0 ? (
          <>
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
            {restaurants.length > 0 && nextPageToken && (
              <button onClick={handleViewMore} className="view-more-button">View More</button>
            )}
          </>
        ) : (
          <img src={loaderGif} alt="loading" id='loading' />
        )}
      </div>
    </div>
    </>
  );
}

export default SearchResultsPage;
