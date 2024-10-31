import React, { useEffect } from 'react';
import '../styles/GoogleMap.css';

function GoogleMap({ center, restaurants }) {
  useEffect(() => {
    if (window.google && center) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 14,
      });

      restaurants.forEach((restaurant) => {
        new window.google.maps.Marker({
          position: {
            lat: restaurant.geometry.location.lat,
            lng: restaurant.geometry.location.lng,
          },
          map,
          title: restaurant.name,
        });
      });
    }
  }, [center, restaurants]);

  return <div id="map" className="map"> PLACEHOLDER FOR MAP </div>;
}

export default GoogleMap;
