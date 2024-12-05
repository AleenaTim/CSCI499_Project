import React, { useEffect } from 'react';
import Image from "./tacoShopImg.jpeg"; 
import { FaLocationDot } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import '../styles/RestaurantPage.css';

function RestaurantPage() {
    const restaurant = [{name: "LOS TACOS No. 1", 
                        formatted_address: " 229 West 43rd St, New York, NY 10036", 
                        rating: "4.8", 
                        editorial_summary: "Small pit stop with standing tables serving authentic Mexican street food.", 
                        opening_hours: ["Monday 11 AM-11 PM", "Tuesday 11 AM-11 PM", "Wednesday 11 AM-11 PM",
                                         "Thursday 11 AM-11 PM", "Friday 11 AM-11 PM", "Saturday 11 AM-11 PM", 
                                            "Sunday 11AM-9PM"
                                        ], 
                        menu: "https://www.lostacos1.com/menus/"
    }]; 
    useEffect(() => {
        let map, infoWindow, service, directionsService, directionsRenderer, userLocation;
    
        function initMap() {
          map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.757222, lng: -73.9875 }, //Central Park
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
                  lat: 40.757557 ,
                  lng: -73.987783,
                };
    
    
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
            radius: 50,
            name: "LOS TACOS No.1",
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
        <>
        <div className="myContainer">
            
            <div className="leftSideBar">
                <div>
                    <img className="tacoImg" src={Image} alt="Los Tacos No 1"/>
                    <div className="bottom-left">
                        <div className="imgTxt">
                            <div className="location">
                                <FaLocationDot /><span>"NYC"</span>
                            </div>
                            <p>$10-$20</p>
                            <h1>{restaurant[0].name}</h1>
                        </div>
                    </div>

                </div>

                <div>
                    <span className='sp'>{restaurant[0].editorial_summary}</span>
                </div>
            </div>
            <div className="rightSideBar">
                <div className="rightSideBarContent">
                    <div className="MLocation">
                      <div id="map" style={{ height: "300px", width: "300px" }}></div>
                      <p className="ra">{restaurant[0].formatted_address}</p>
                      <hr></hr>
                    </div>

                   
                    <div className="LinkDiv">
                        <a href="https://www.lostacos1.com/#">Lost Tacos No. 1</a>
                        <FaExternalLinkAlt />
                        <hr></hr>
                    </div>
                   
                    <div className="OPH">
                      <p>Hours of Operation</p>
                        <ul>
                            {restaurant[0].opening_hours.map((item,index)=>(
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            
    

        </div>
        </>

    );
  }
export default RestaurantPage;
