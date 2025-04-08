import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React from "react";
import Slider from "react-slick";
import SpotLightCard from "./components/SpotLightCard";

function SpotLights() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, // Enable center mode
    centerPadding: "20px", // Adjust the center padding to control spacing
  };

  return (
    <Slider {...settings}>
      <SpotLightCard />

      <SpotLightCard />

      <SpotLightCard />

      {/* Add more SpotLightCard components as needed */}
    </Slider>
  );
}

export default SpotLights;
