import React from "react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination styles
import "../styles/MeetTheTeam.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Import Pagination module
import mahel from '../assets/mahel.jpg';
import miah from '../assets/miah.jpg';
import ilya from '../assets/ilya.png';
import steven from '../assets/steven.png';
import aleena from '../assets/aleena.jpg';


const MeetTheTeam = () => {
  return (
    <div className="responsive-container-block outer-container">
      <div className="responsive-container-block inner-container">
        <p className="text-blk section-head-text">Our Team</p>
        <p className="text-blk section-subhead-text">
        Discover the team that serves up the code, one byte at a time, to help you find the best bites in town!        </p>
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
                    src={mahel}
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Mahel Napo</p>
                  <p className="text-blk position">Full-Stack Software Engineer</p>
                  <p className="text-blk email">mnnap600@gmail.com</p>
                  {/* <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p> */}
                </div>
              </div>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src={miah}
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Miah Kirton</p>
                  <p className="text-blk position">Frontend Software Engineer</p>
                  <p className="text-blk email">miahkirton1@gmail.com</p>
                  {/* <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p> */}
                </div>
              </div>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src={steven}
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Steven Lin</p>
                  <p className="text-blk position">Frontend Software Engineer</p>
                  <p className="text-blk email">slin93010@gmail.com</p>
                  {/* <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p> */}
                </div>
              </div>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src={ilya}
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Ilya Brandt</p>
                  <p className="text-blk position">Backend Software Engineer</p>
                  <p className="text-blk email">ilyalakki@gmail.com</p>
                  {/* <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p> */}
                </div>
              </div>
              <div className="team">
                <div className="img-wrapper">
                  <img
                    src={aleena}
                    alt="Team Member"
                  />
                </div>
                <div className="team-content">
                  <p className="text-blk name">Aleena Tim</p>
                  <p className="text-blk position">Backend Software Engineer</p>
                  <p className="text-blk email">aleenatim@gmail.com</p>
                  {/* <p className="text-blk testimonial">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  </p> */}
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
