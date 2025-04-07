import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { images } from "./images/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <div>
        <Carousel
          autoPlay={true}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
        >
          {images.map((imagesItemLink, index) => {
            return <img src={imagesItemLink} key={index} />;
          })}
        </Carousel>
      </div>
      <div className={classes.hero_images}></div>
    </div>
  );
}

export default CarouselEffect;
