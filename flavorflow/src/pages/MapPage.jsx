import React, { useEffect } from 'react';
import '../styles/MapPage.css'; 


const RestaurantMap = ({filterValue}) => {
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

    function getDistance(){
      // Add null check for filterValue
      if(!filterValue || filterValue.length === 0){
        return 0;
      }
      
      for(let i = 0; i < filterValue.length; i++){ 
        if(filterValue[i][1] === "distance"){
          return filterValue[i][0];  
        }
      }
      return 0; 
    }

    function fetchNearbyRestaurants(location) {
      let dist = getDistance()>0 ? getDistance() : 1500; 
      const request = {
        location: location,
        radius: dist,
        type: "restaurant",
      };

      service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status, pagination) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const filteredResults = results.filter((place) => applyFilters(place));
          filteredResults.forEach((place) => {
            // Create markers for each place
            createMarker(place);
          });
      
          // If there are more results, fetch them
          if (pagination && pagination.hasNextPage) {
            setTimeout(() => pagination.nextPage(), 200); // Add a delay to prevent exceeding rate limits
          }
        }
      });
      
    }

    function applyFilters(place){
      // Add null check for filterValue
      if(!filterValue || filterValue.length === 0){ 
        return true; 
      }
      
      let count = 0; 
      let priceCount = 0; 
      let filterLength = filterValue.length; 
      
      for(let i = 0; i < filterValue.length; i++){ 
        if(filterValue[i][1] === "rating"){
          if(place.rating > filterValue[i][0]){
            count++; 
          }
        }
        if(filterValue[i][1] === "price"){
            priceCount++; 
            if(
              (place.price_level=== 1 && filterValue[i][0] === "affordable") //place.price_level returns a number 0-5
              || (place.price_level=== 2 && filterValue[i][0] === "semi-affordable")
              || (place.price_level=== 3 && filterValue[i][0] === "semi-expensive")
              || (place.price_level === 4 && filterValue[i][0] === "expensive")
            ){
              count++; 
            }
        }
        if(filterValue[i][1] === "distance"){
          count++;  
        }

      }
      if(priceCount >= 2){
        filterLength = filterLength-priceCount+1; 
      }
      if(count === filterLength){
        return true; 
      }
    
      return false;
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
                ${photoUrl ? `<img className="restaurant-image" src="${photoUrl}" alt="${name}">` : ""}
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
  }, [filterValue]);

  return (
    <div id="map" style={{ height: "70vh", width: "100%" }}></div>
  );
};

export default RestaurantMap;