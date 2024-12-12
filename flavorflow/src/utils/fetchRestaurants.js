import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://flavorflow-ovph.onrender.com' 
  : 'http://localhost:5000';

export const fetchRestaurants = async (location, radius, keyword) => {
  const { lat, lng } = location;
  try {
    const response = await axios.get(`${BASE_URL}/api/restaurants`, {
      params: {
        lat,
        lng,
        radius,
        keyword,
        type: 'restaurant',
      },
    });
    //console.log('Response data results:', response.data.results);
    return response.data || {}; // Make sure to return both results and nextPageToken if available
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return {};
  }
};

export const fetchNextPageResults = async (nextPageToken) => {
  // console.log('Fetching next page from URL:', `http://localhost:5000/api/restaurants/next`, 'with params:', { nextPageToken });
  try {
    const response = await axios.get(`${BASE_URL}/api/restaurants/next`, {
      params: {
        nextPageToken, // Ensure nextPageToken is properly populated
      },
    });
    //console.log('Next page response:', response.data.results);
    return response.data || {};
  } catch (error) {
    console.error('Error fetching next page results:', error);
    return {};
  }
};

export const fetchRestaurantDetails = async (place_id) => {
  //console.log('Fetching restaurant details for place_id in fetch:', place_id);
  try {
    const response = await axios.get(`http://localhost:5000/api/restaurant/details`, {
      params: {
        place_id,
      },
    });
    //console.log('Restaurant details response:', response.data.result);
    return response.data || {};
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return {};
  }
};
