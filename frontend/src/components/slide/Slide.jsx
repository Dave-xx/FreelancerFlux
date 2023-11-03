import React from "react";
// import "C:/Users/Haileabe/Documents/Code/React Projects/fiverr-clone/node_modules/infinite-react-carousel/lib/carousel/style.css?inline";
import Slider from "infinite-react-carousel";
import "./Slide.scss";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
