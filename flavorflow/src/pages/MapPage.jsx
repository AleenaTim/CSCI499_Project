/*function MapPage(){
   return (
    <div>Map</div>
   );  
}

*/

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
      if(filterValue.length != 0){
        for(let i =0; i<filterValue.length; i++){ 
          if(filterValue[i][1] == "distance"){
             return filterValue[i][0];  
          }
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
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const filteredResults = results.filter((place) => applyFilters(place)); 
          filteredResults.forEach((place) => {
            createMarker(place);
          });
        }
      });
    }

    function applyFilters(place){
      let count = 0; 
      let priceCount = 0; 
      let filterLength = filterValue.length; 
      if(filterValue.length === 0){ //empty?
        return true; 
      }
      for(let i =0; i<filterValue.length; i++){ 
        if(filterValue[i][1] == "rating"){
          if(place.rating > filterValue[i][0]){
            count++; 
          }
        }
        if(filterValue[i][1] == "price"){
            priceCount++; 
            if(place.price_level == "1" && filterValue[i][0] == "affordable" 
                || place.price_level == "2" && filterValue[i][0] == "semi-affordable" 
                || place.price_level == "3" && filterValue[i][0] == "semi-expensive" 
                || place.price_level == "4" && filterValue[i][0] == "expensive"){
              count++; 
            }
        }
        if(filterValue[i][1] == "distance"){
          count++;  
        }

      }
      if(priceCount >= 2){
        filterLength = filterLength-priceCount+1; 
      }
      if(count == filterLength){
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
  }, [filterValue]);

  return (
    <div id="map" style={{ height: "70vh", width: "100%" }}></div>
  );
};

export default RestaurantMap;

//YO
// import React, { useEffect, useState } from 'react';

// const RestaurantMap = () => {
//   const [filters, setFilters] = useState({
//     stars: null,
//     type: '',
//     kosher: false,
//     vegan: false,
//     glutenFree: false,
//     priceLevel: null,
//     cuisine: '',
//   });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   useEffect(() => {
//     let map, userMarker, infoWindow, service, directionsService, directionsRenderer, userLocation;

//     function initMap() {
//       map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: -33.8688, lng: 151.2093 },
//         zoom: 15,
//       });

//       infoWindow = new window.google.maps.InfoWindow();
//       directionsService = new window.google.maps.DirectionsService();
//       directionsRenderer = new window.google.maps.DirectionsRenderer();
//       directionsRenderer.setMap(map);

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             userLocation = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             };

//             userMarker = new window.google.maps.Marker({
//               position: userLocation,
//               map,
//               icon: {
//                 url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//                 scaledSize: new window.google.maps.Size(40, 40),
//               },
//               title: "You are here",
//             });

//             map.setCenter(userLocation);
//             fetchNearbyRestaurants(userLocation);
//           },
//           () => {
//             handleLocationError(true, map.getCenter());
//           }
//         );
//       } else {
//         handleLocationError(false, map.getCenter());
//       }
//     }

//     function handleLocationError(browserHasGeolocation, pos) {
//       infoWindow.setPosition(pos);
//       infoWindow.setContent(
//         browserHasGeolocation
//           ? "Error: The Geolocation service failed."
//           : "Error: Your browser doesn't support geolocation."
//       );
//       infoWindow.open(map);
//     }

//     function fetchNearbyRestaurants(location) {
//       const request = {
//         location: location,
//         radius: 1500,
//         type: "restaurant",
//       };

//       service = new window.google.maps.places.PlacesService(map);
//       service.nearbySearch(request, (results, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           const filteredResults = results.filter((place) => applyFilters(place));
//           filteredResults.forEach((place) => {
//             createMarker(place);
//           });
//         }
//       });
//     }

//     function applyFilters(place) {
//       if (filters.stars && place.rating < filters.stars) {
//         return false;
//       }
//       if (filters.type && !place.types.includes(filters.type)) {
//         return false;
//       }
//       if (filters.kosher && !place.types.includes("kosher")) {
//         return false;
//       }
//       if (filters.vegan && !place.types.includes("vegan")) {
//         return false;
//       }
//       if (filters.glutenFree && !place.types.includes("gluten_free")) {
//         return false;
//       }
//       if (filters.priceLevel && place.price_level !== filters.priceLevel) {
//         return false;
//       }
//       if (filters.cuisine && !place.types.includes(filters.cuisine)) {
//         return false;
//       }
//       return true;
//     }

//     function createMarker(place) {
//       const marker = new window.google.maps.Marker({
//         map,
//         position: place.geometry.location,
//       });

//       window.google.maps.event.addListener(marker, "click", () => {
//         service.getDetails({ placeId: place.place_id }, (result, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             const { name, vicinity, price_level, types, rating, photos } = result;

//             // Use the first photo if available
//             const photoUrl = photos && photos.length > 0 ? photos[0].getUrl({ maxWidth: 250, maxHeight: 150 }) : null;

//             // Build the content for the info window with an image
//             let content = `
//               <div class="info-window" style="font-family: Arial, sans-serif; max-width: 250px;">
//                 ${photoUrl ? `<img src="${photoUrl}" alt="${name}" style="width: 100%; height: auto; max-height: 150px; object-fit: cover; border-radius: 5px; margin-bottom: 5px;">` : ""}
//                 <div class="title" style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${name}</div>
//                 <div class="rating" style="display: flex; align-items: center; font-size: 14px; margin-bottom: 5px;"><span class="star" style="color: #FFD700; margin-right: 4px;">★</span>${rating || 'N/A'}</div>
//                 <div class="address" style="font-size: 14px; margin-bottom: 5px;">Address: ${vicinity}</div>
//                 <div class="price-level" style="font-size: 14px; margin-bottom: 5px;">Price Level: ${priceLevelToText(price_level)}</div>
//                 <div class="type" style="font-size: 14px; margin-bottom: 5px;">Type: ${types.join(', ')}</div>
//                 <button onclick="window.calculateRoute(${place.geometry.location.lat()}, ${place.geometry.location.lng()})" style="padding: 5px 10px; background-color: #4285f4; color: #fff; border: none; cursor: pointer; font-size: 14px;">Directions</button>
//               </div>
//             `;
//             infoWindow.setContent(content);
//             infoWindow.open(map, marker);
//           }
//         });
//       });
//     }

//     function priceLevelToText(price_level) {
//       switch (price_level) {
//         case 0: return "Free";
//         case 1: return "Low";
//         case 2: return "Mid";
//         case 3: return "High";
//         case 4: return "Expensive";
//         default: return "N/A";
//       }
//     }

//     window.calculateRoute = function(lat, lng) {
//       if (!userLocation) {
//         alert("User location not found. Unable to calculate route.");
//         return;
//       }

//       const destination = { lat, lng };
//       const request = {
//         origin: userLocation,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       };

//       directionsService.route(request, (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           directionsRenderer.setDirections(result);
//         } else {
//           alert("Directions request failed due to " + status);
//         }
//       });
//     };

//     // Load the map once the component is mounted
//     window.initMap = initMap;
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC0cNFE2yyEeftu8jiV8Us_zNDC6xsc2QE&libraries=places&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//   }, [filters]);

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const toggleFilter = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       <button style={{ position: 'absolute', top: '10px', left: '10px', padding: '10px 20px', backgroundColor: '#4285f4', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', borderRadius: '4px', zIndex: 1001 }} onClick={toggleFilter}>
//         {isFilterOpen ? 'Close Filters' : 'Open Filters'}
//       </button>
//       {isFilterOpen && (
//         <div style={{ position: 'fixed', top: '0', left: '0', width: '300px', height: '100vh', backgroundColor: 'white', padding: '20px', borderRight: '2px solid #ddd', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', zIndex: 1000 }}>
//           <h2 style={{ marginTop: '0', fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>Applied Filters</h2>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Stars:
//             <select name="stars" onChange={handleFilterChange} style={{ width: '100%', marginTop: '5px' }}>
//               <option value="">Any</option>
//               <option value="1">1 Star</option>
//               <option value="2">2 Stars</option>
//               <option value="3">3 Stars</option>
//               <option value="4">4 Stars</option>
//               <option value="5">5 Stars</option>
//             </select>
//           </label>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Type of Food:
//             <input type="text" name="type" onChange={handleFilterChange} style={{ width: '100%', marginTop: '5px' }} />
//           </label>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Kosher:
//             <input type="checkbox" name="kosher" onChange={handleFilterChange} />
//           </label>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Vegan:
//             <input type="checkbox" name="vegan" onChange={handleFilterChange} />
//           </label>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Gluten Free:
//             <input type="checkbox" name="glutenFree" onChange={handleFilterChange} />
//           </label>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Price Level:
//             <select name="priceLevel" onChange={handleFilterChange} style={{ width: '100%', marginTop: '5px' }}>
//               <option value="">Any</option>
//               <option value="0">Free</option>
//               <option value="1">Low</option>
//               <option value="2">Mid</option>
//               <option value="3">High</option>
//               <option value="4">Expensive</option>
//             </select>
//           </label>
//           <label style={{ display: 'block', marginBottom: '15px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
//             Cuisine:
//             <input type="text" name="cuisine" onChange={handleFilterChange} style={{ width: '100%', marginTop: '5px' }} />
//           </label>
//         </div>
//       )}
//       <div id="map" style={{ height: "100vh", width: "100%" }}></div>
//     </div>
//   );
// };

// export default RestaurantMap;
