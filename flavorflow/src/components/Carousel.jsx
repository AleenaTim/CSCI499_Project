import React from 'react';
import '../styles/Carousel.css';

function Carousel() {
  return (
    <div className="carousel">
      {/* You can add a library like react-slick for a real carousel */}
      <div className="carousel-text">
        <h2>Life is Gourd</h2>
        <p>Discover pumpkin patches and more!</p>
        <button className="carousel-button">Pumpkin Patches</button>
      </div>
    </div>
  );
}

export default Carousel;
