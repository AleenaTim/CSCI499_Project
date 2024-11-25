import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import '../styles/HomePage.css';  

function HomePage() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setError('Unable to fetch location. Please enable GPS.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // // Fetch restaurants based on user's location
  // useEffect(() => {
  //   if (location) {
  //     const fetchData = async () => {
  //       const results = await fetchRestaurants(location, 500, '');
  //       setRestaurants(results);
  //     };
  //     fetchData();
  //   }
  // }, [location]);


  useEffect(() => {
    let map, userMarker, infoWindow, service, directionsService, directionsRenderer, userLocation;

    function initMap() {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.782864, lng: -73.965355 }, //Central Park
        zoom: 15,
      });

      infoWindow = new window.google.maps.InfoWindow();
      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            userMarker = new window.google.maps.Marker({
              position: userLocation,
              map,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              },
              title: "You are here",
            });

            map.setCenter(userLocation);
            fetchNearbyRestaurants(userLocation);
          },
          () => {
            handleLocationError(true, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    function fetchNearbyRestaurants(location) {
      const request = {
        location: location,
        radius: 1500,
        type: "restaurant",
      };

      service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            createMarker(place);
          });
        }
      });
    }



    function createMarker(place) {
      const marker = new window.google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      window.google.maps.event.addListener(marker, "click", () => {
        service.getDetails({ placeId: place.place_id }, (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const { name, vicinity, price_level, types, rating, photos } = result;

            // Use the first photo if available
            const photoUrl = photos && photos.length > 0 ? photos[0].getUrl({ maxWidth: 250, maxHeight: 150 }) : null;

            // Build the content for the info window with an image
            let content = `
              <div class="info-window">
                ${photoUrl ? `<img src="${photoUrl}" alt="${name}">` : ""}
                <div class="title">${name}</div>
                <div class="rating"><span class="star">★</span>${rating || 'N/A'}</div>
                <div class="address">Address: ${vicinity}</div>
                <div class="price-level">Price Level: ${priceLevelToText(price_level)}</div>
                <div class="type">Type: ${types.join(', ')}</div>
                <button onclick="window.calculateRoute(${place.geometry.location.lat()}, ${place.geometry.location.lng()})">Directions</button>
              </div>
            `;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
          }
        });
      });
    }

    function priceLevelToText(price_level) {
      switch (price_level) {
        case 0: return "Free";
        case 1: return "Low";
        case 2: return "Mid";
        case 3: return "High";
        case 4: return "Expensive";
        default: return "N/A";
      }
    }

    window.calculateRoute = function(lat, lng) {
      if (!userLocation) {
        alert("User location not found. Unable to calculate route.");
        return;
      }

      const destination = { lat, lng };
      const request = {
        origin: userLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          alert("Directions request failed due to " + status);
        }
      });
    };

    // Load the map once the component is mounted
    window.initMap = initMap;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC0cNFE2yyEeftu8jiV8Us_zNDC6xsc2QE&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);


  return (
    <div>
      <div className="hero-section">
        <Carousel />
        <SearchBar setRestaurants={setRestaurants} location={location} />
      </div>
      {location && (
        <div className="map-container">
          {/* <Map center={location} restaurants={restaurants} /> */}

          <div id="map" style={{ height: "500px", width: "800px" }}></div>

        </div>
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Display restaurant cards */}
      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
