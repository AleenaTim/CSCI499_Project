import React from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import food1 from '../assets/thanks-giving.jpg'; 
import food2 from '../assets/food2.jpg'; 
import food3 from '../assets/food3.jpg'; 
import food4 from '../assets/food4.jpg'; 
import food5 from '../assets/food5.jpg'; 

function Carousel() {
  const images = [food1, food2, food3, food4, food5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (<div className='carousel'>
    <div className="carousel-container">
      <Slider {...settings}>
        {/* Image Slides */}
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>        {/* Text Slide */}
      <div className="carousel-slide">

        <div className="carousel-text">
          <h2>Life is Gourd</h2>
          <p>Discover places to eat and more!</p>
          {/* <button className="carousel-button">Pumpkin Patches</button> */}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Carousel;
