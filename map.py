

import requests
import folium
import time
from geopy.distance import geodesic  # To calculate the distance between locations
from math import radians, sin, cos, sqrt, atan2, degrees

API_KEY = 'GOOGLE Cloud Service API'  # Your Google Maps API Key

# Function to get current location using Google Geolocation API
def get_current_location():
    url = f'https://www.googleapis.com/geolocation/v1/geolocate?key={API_KEY}'
    data = {"considerIp": "true"}  # Use IP to get location
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        location = response.json().get('location', {})
        lat = location.get('lat')
        lon = location.get('lng')
        print(f"Current location fetched: Latitude: {lat}, Longitude: {lon}")  # Debugging information
        return lat, lon
    else:
        print(f"Error fetching location. Response: {response.json()}")  # Show error details
        return None, None

# Function to get place details
def get_place_details(place_id):
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        'place_id': place_id,
        'fields': 'name,website,rating,types,formatted_address,price_level,place_id',
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        result = response.json().get('result', {})
        website = result.get('website', 'No website available')
        rating = result.get('rating', 'No rating available')
        place_types = result.get('types', ['No type available'])
        address = result.get('formatted_address', 'No address available')
        price_level = result.get('price_level', 0)

        # Convert price_level to a user-friendly format
        if price_level == 1:
            price_level_str = "Low"
        elif price_level == 2:
            price_level_str = "Mid"
        elif price_level >= 3:
            price_level_str = "High"
        else:
            price_level_str = "No price level available"
        
        return website, rating, place_types, address, price_level_str
    else:
        print(f"Error fetching place details. Status: {response.status_code}. Response: {response.json()}")
        return 'No website available', 'No rating available', ['No type available'], 'No address available', 'No price level available'

# Function to find nearby restaurants
def find_nearby_restaurants(lat, lon, radius=4828, max_results=60):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    all_restaurants = []
    params = {
        'location': f'{lat},{lon}',
        'radius': radius,
        'type': 'restaurant',
        'key': API_KEY
    }
    
    while len(all_restaurants) < max_results:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json().get('results', [])
            all_restaurants.extend(results)
            
            next_page_token = response.json().get('next_page_token')
            if next_page_token:
                time.sleep(2)
                params['pagetoken'] = next_page_token
            else:
                break
        else:
            print(f"Error: {response.status_code}. Response: {response.json()}")
            break
    
    return all_restaurants[:max_results]

# Function to calculate the direction (bearing) in degrees
def calculate_direction(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    x = sin(dlon) * cos(lat2)
    y = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dlon)
    initial_bearing = atan2(x, y)
    bearing = (degrees(initial_bearing) + 360) % 360
    return bearing

# Function to create the map with current location and nearby restaurants
def create_map_with_restaurants():
    lat, lon = get_current_location()
    
    if lat is None or lon is None:
        print("Could not determine current location.")
        return
    
    # Create map centered on current location
    my_map = folium.Map(location=[lat, lon], zoom_start=16, tiles='CartoDB Positron')

    # Add a marker for the current location
    folium.CircleMarker(
        location=[lat, lon],
        radius=10,
        popup="You are here",
        color="blue",
        fill=True,
        fill_color="blue"
    ).add_to(my_map)
    
    # Find and add nearby restaurants
    restaurants = find_nearby_restaurants(lat, lon, max_results=60)
    
    # Add markers for restaurants
    for restaurant in restaurants:
        name = restaurant.get('name')
        lat_rest = restaurant['geometry']['location']['lat']
        lon_rest = restaurant['geometry']['location']['lng']
        place_id = restaurant['place_id']
        
        # Get additional place details
        website, rating, place_types, address, price_level = get_place_details(place_id)
        
        # Calculate the distance from current location to restaurant
        distance = geodesic((lat, lon), (lat_rest, lon_rest)).km
        
        # Calculate direction (bearing in degrees)
        direction = calculate_direction(lat, lon, lat_rest, lon_rest)
        
        # Format the types into a readable string
        place_types_str = ', '.join(place_types)
        
        # Create clickable website link if available
        if website != 'No website available':
            website_link = f'<a href="{website}" target="_blank">Website</a>'
        else:
            website_link = 'No website available'
        
        # Custom direction text
        direction_text = f"Head {direction:.2f}° towards {name}"
        
        # Create the popup with direction link
        popup = (f"""
            <div style="font-family: Arial, sans-serif; padding: 10px; width: 250px; color: #333;">
                <h4 style="margin: 0; color: #2c7fb8;">{name}</h4>
                <p style="margin: 5px 0;"><b>Rating:</b> {rating} | <b>Distance:</b> {distance:.2f} km</p>
                <p style="margin: 5px 0;"><b>Type:</b> {place_types_str}</p>
                <p style="margin: 5px 0;"><b>Address:</b> {address}</p>
                <p style="margin: 5px 0;"><b>Price Level:</b> {price_level}</p>
                <p>{website_link}</p>
                <p style="margin: 5px 0;"><b>Direction:</b> {direction_text}</p>
                <a href="https://www.google.com/maps/dir/?api=1&origin={lat},{lon}&destination={lat_rest},{lon_rest}" 
                   target="_blank" style="color: white; background-color: #4CAF50; padding: 5px 10px; text-align: center;
                   text-decoration: none; display: inline-block; border-radius: 5px; font-weight: bold;">
                   Get Directions
                </a>
            </div>
        """)
        
        # Add CircleMarker for the restaurant
        folium.CircleMarker(
            location=[lat_rest, lon_rest],
            radius=7,
            popup=popup,
            color="green",
            fill=True,
            fill_color="green",
            fill_opacity=0.7
        ).add_to(my_map)
    
    # Save map to an HTML file
    my_map.save("map.html")
    print("Map created successfully and saved as 'map.html'.")

# Run the function
create_map_with_restaurants()
