import axios from 'axios';

export const fetchRestaurants = async (location, radius, keyword) => {
  const { lat, lng } = location;
  try {
    const response = await axios.get(`http://localhost:5000/api/restaurants`, {
      params: {
        lat,
        lng,
        radius,
        keyword,
        type: 'restaurant',
      },
    });
    // Log the results to verify the response structure
    console.log('Response data results:', response.data.results);
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};
