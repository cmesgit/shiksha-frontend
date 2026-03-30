import React from "react";
import teachersData from "../data/teachersData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../css/teachers-slider.css";

const TeachersSlider = () => {
  return (
    <section className="teachers-slider-section">
      {/* ambient glow — mirrors hero-glow-2 */}
      <div className="teachers-slider-glow"></div>

      <div className="teachers-slider-container">

        {/* HEADER */}
        <div className="teachers-header">
          <p className="teachers-subtitle">Our Faculty</p>
          <h2 className="teachers-title">Meet Our Expert Teachers</h2>
          <p className="teachers-description">
            Learn from experienced and dedicated teachers who guide students
            toward academic success.
          </p>
        </div>

        {/* SLIDER */}
        <Swiper
          className="teachers-swiper"
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2500, pauseOnMouseEnter: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0:    { slidesPerView: 1 },
            576:  { slidesPerView: 2 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {teachersData.map((teacher) => (
            <SwiperSlide key={teacher.id}>
              <div className="teacher-slider-card">
                <div className="teacher-slider-image-wrap">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="teacher-slider-image"
                    loading="lazy"
                  />
                </div>

                <div className="teacher-slider-info">
                  <h3>{teacher.name}</h3>
                  <p>{teacher.subject}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default TeachersSlider;