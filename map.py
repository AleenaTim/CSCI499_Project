import requests
import folium

API_KEY = 'API GOOGLE KEY'

# Function to get current location using Google Geolocation API
def get_current_location():
    url = f'https://www.googleapis.com/geolocation/v1/geolocate?key={API_KEY}'
    data = {"considerIp": "true"}  # Use IP to get location
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        location = response.json().get('location', {})
        lat = location.get('lat')
        lon = location.get('lng')
        return lat, lon
    else:
        print("Error fetching location")
        return None, None

# Function to get place details, including website
def get_place_details(place_id):
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        'place_id': place_id,
        'fields': 'name,website',
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        result = response.json().get('result', {})
        website = result.get('website', 'No website available')
        return website
    else:
        print(f"Error fetching place details: {response.status_code}")
        return 'No website available'

# Function to find nearby restaurants, handling pagination
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
            
            # Check if more results are available
            next_page_token = response.json().get('next_page_token')
            if next_page_token:
                params['pagetoken'] = next_page_token
            else:
                break
        else:
            print(f"Error: {response.status_code}")
            break
    
    return all_restaurants[:max_results]  # Limit to max_results

# Function to create the map with current location and nearby restaurants
def create_map_with_restaurants():
    lat, lon = get_current_location()
    
    if lat is None or lon is None:
        print("Could not determine current location.")
        return
    
    # Create map centered on current location
    my_map = folium.Map(location=[lat, lon], zoom_start=14, tiles='CartoDB Positron')

    # Add a marker for the current location
    folium.CircleMarker(
        location=[lat, lon],
        radius=10,
        popup="You are here",
        color="blue",
        fill=True,
        fill_color="blue"
    ).add_to(my_map)
    
    # Find and add nearby restaurants (up to 60 restaurants, as an example)
    restaurants = find_nearby_restaurants(lat, lon, max_results=60)
    
    # Add markers for restaurants
    for restaurant in restaurants:
        name = restaurant.get('name')
        lat_rest = restaurant['geometry']['location']['lat']
        lon_rest = restaurant['geometry']['location']['lng']
        place_id = restaurant['place_id']
        
        # Get website using place details API
        website = get_place_details(place_id)
        
        # Popup with restaurant name and clickable website link
        popup = f"<b>{name}</b><br><a href='{website}' target='_blank'>{website}</a>"
        
        
        # Add CircleMarker for the restaurant
        folium.CircleMarker(
            location=[lat_rest, lon_rest],
            radius=7,
            popup=popup,
            color="red",
            fill=True,
            fill_color="red",
            fill_opacity=0.7
        ).add_to(my_map)
    
    # Save map to an HTML file
    my_map.save("generated_map.html")
    print("Map created successfully and saved as 'generated_map.htmp'.")

# Run the function
create_map_with_restaurants()
