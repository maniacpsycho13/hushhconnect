"use client";
import React, { useEffect } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from "next/image";
import { hushhprofile } from "../../../public/profilePage"; // Adjust the import path as needed
import './Carosuel.css';

const images: StaticImageData[] = [hushhprofile, hushhprofile, hushhprofile, hushhprofile, hushhprofile, hushhprofile];

const SimpleSlider: React.FC = () => {
  useEffect(() => {
    const handleResize = () => {
      const slides = document.querySelectorAll<HTMLElement>(".slick-slide");
      slides.forEach((slide) => {
        slide.classList.remove("scale-1", "bigger", "biggest", "smaller");
      });

      slides.forEach((slide) => {
        const isCenter = slide.classList.contains("slick-center");
        const isNextToCenter = (
          (slide.previousSibling && (slide.previousSibling as HTMLElement).classList.contains("slick-center")) ||
          (slide.nextSibling && (slide.nextSibling as HTMLElement).classList.contains("slick-center"))
        );
        const isThirdFromCenter = (
          (slide.previousSibling && slide.previousSibling.previousSibling &&
            (slide.previousSibling.previousSibling as HTMLElement).classList.contains("slick-center")) ||
          (slide.nextSibling && slide.nextSibling.nextSibling &&
            (slide.nextSibling.nextSibling as HTMLElement).classList.contains("slick-center"))
        );

        if (isCenter) {
          slide.classList.add("biggest");
        } else if (isNextToCenter) {
          slide.classList.add("bigger");
        } else if (isThirdFromCenter) {
          slide.classList.add("smaller");
        } else {
          slide.classList.add("scale-1");
        }
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: () => {
      const slides = document.querySelectorAll<HTMLElement>(".slick-slide");
      slides.forEach((slide) => {
        slide.classList.remove("scale-1", "bigger", "biggest", "smaller");
      });

      slides.forEach((slide) => {
        const isCenter = slide.classList.contains("slick-center");
        const isNextToCenter = (
          (slide.previousSibling && (slide.previousSibling as HTMLElement).classList.contains("slick-center")) ||
          (slide.nextSibling && (slide.nextSibling as HTMLElement).classList.contains("slick-center"))
        );
        const isThirdFromCenter = (
          (slide.previousSibling && slide.previousSibling.previousSibling &&
            (slide.previousSibling.previousSibling as HTMLElement).classList.contains("slick-center")) ||
          (slide.nextSibling && slide.nextSibling.nextSibling &&
            (slide.nextSibling.nextSibling as HTMLElement).classList.contains("slick-center"))
        );

        if (isCenter) {
          slide.classList.add("biggest");
        } else if (isNextToCenter) {
          slide.classList.add("bigger");
        } else if (isThirdFromCenter) {
          slide.classList.add("smaller");
        } else {
          slide.classList.add("scale-1");
        }
      });
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <Image className="profile-image" src={image} alt={`profile-${index}`} layout="responsive" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom next arrow
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );
};

export default SimpleSlider;
