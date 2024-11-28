import React from 'react';
import '../styles/Carousel.css';

function Carousel() {
  return (
    <div className="carousel">
      {/* Might add react slick library for carousel later */}
      <div className="carousel-text">
        <h2>Life is Gourd</h2>
        <p>Discover places to eat and more!</p>
        {/* <button className="carousel-button">Pumpkin Patches</button> */}
      </div>
    </div>
  );
}

export default Carousel;
