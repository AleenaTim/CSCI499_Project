const API_KEY = '7723a6fcd0msh8f9b3a4a469cb5dp1bbab6jsnf4d48bd00912';
const API_HOST = 'worldwide-restaurants.p.rapidapi.com';
const API_URL = 'https://worldwide-restaurants.p.rapidapi.com/search';

export const fetchRestaurants = async (locationId, query = '', offset = 0) => {
  const data = new FormData();
  data.append('language', 'en_US');          // Required parameter
  data.append('location_id', locationId);    // Location ID for the search
  data.append('currency', 'USD');            // Currency format
  data.append('offset', offset.toString());  // Pagination offset
  data.append('q', query);                   // Search query, like "pizza", "sushi", etc.

  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': API_KEY,             // Your RapidAPI key
      'x-rapidapi-host': API_HOST,           // API Host
    },
    body: data,
  };

  try {
    const response = await fetch(API_URL, options);   // Make the POST request
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const result = await response.json();             // Parse the JSON response
    return result.results.data;                       // Access the relevant data (based on the API response structure)
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};