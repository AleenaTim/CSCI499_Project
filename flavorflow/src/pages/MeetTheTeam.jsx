import React from "react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination styles
import "../styles/MeetTheTeam.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Import Pagination module

const MeetTheTeam = () => {
  return (
    <div className="responsive-container-block outer-container">
      <div className="responsive-container-block inner-container">
        <p className="text-blk section-head-text">Our Team</p>
        <p className="text-blk section-subhead-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        </p>
        <div className="responsive-container-block">
          <Swiper
            className="team-swiper"
            modules={[Pagination]} // Use the Pagination module
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            breakpoints={{
              200: { slidesPerView: 1, spaceBetween: 20 },
              750: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2.5, spaceBetween: 30 },
              1100: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            <SwiperSlide>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw41.png"
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Roger Rubin</p>
                  <p className="text-blk position">Lorem ipsum</p>
                  <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p>
                </div>
              </div>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw41.png"
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Roger Rubin</p>
                  <p className="text-blk position">Lorem ipsum</p>
                  <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p>
                </div>
              </div>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw41.png"
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Roger Rubin</p>
                  <p className="text-blk position">Lorem ipsum</p>
                  <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p>
                </div>
              </div>
            </SwiperSlide>
            {/* Add more SwiperSlides as needed */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
