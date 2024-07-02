// Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { FaTv } from 'react-icons/fa';
import bbIcon from '../assets/bb.png';


const Carousel = ({ videos }) => {
  // Slick Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="lg:mx-10 mx-6 lg:px-6 lg:py-6 rounded shadow-2xl shadow-fuchsia-200 bg-white/50 mt-6">
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id} className="relative p-2">
            <img src={video.image_url} alt={`video-${video.id}`} className="lg:w-full lg:h-auto w-[800px] h-[200px]" />
            {/* <FaTv className="absolute top-2 left-2 text-white text-2xl" /> */}
            <img src={bbIcon} alt="Bubble TV Icon" className="absolute top-2 right-2 w-32 h-24 lg:hidden" />

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;









