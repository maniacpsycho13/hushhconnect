"use client"
import React, { useRef, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProfileSwipeCard from './ProfileSwipeCard'; // Adjust the path if necessary

export type UserDetails = {
  id: string
  username: string | null
  profilePic: string | null
  bio: string | null
  email: string | null
  name: string | null
  lastname: string | null
  socialmedia?: any
  coins: number
  posts?: any
}

interface ProfileCarouselProps {
  userDetails: UserDetails;
}

const ProfileCarousel: React.FC<ProfileCarouselProps> = ({ userDetails }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const CarouselImages = [
    { id: 1, content: () => <ProfileSwipeCard {...userDetails} /> },
    { id: 2, content: () => <div className='flex items-center justify-center w-full h-full text-white text-6xl bg-black'>2</div> },
    { id: 3, content: () => <div className='flex items-center justify-center w-full h-full text-white text-6xl bg-black'>3</div> },
    { id: 4, content: () => <div className='flex items-center justify-center w-full h-full text-white text-6xl bg-black'>4</div> },
    { id: 5, content: () => <div className='flex items-center justify-center w-full h-full text-white text-6xl bg-black'>5</div> }
  ];

  const handleLeftClick = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  const handleRightClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const onAfterChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='relative w-full h-screen'>
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        arrows={false}
        swipeable={false}
        draggable={false}
        showDots={false}
        afterChange={(previousSlide, { currentSlide }) => onAfterChange(currentSlide)}
      >
        {CarouselImages.map((item) => (
          <div key={item.id} className="w-full h-full">
            {item.content()}
          </div>
        ))}
      </Carousel>

      <div
        className='absolute top-0 left-0 w-1/6 h-[70%] cursor-pointer'
        onClick={handleLeftClick}
        aria-label="Previous Slide"
      />
      <div
        className='absolute top-0 right-0 w-1/6 h-[70%] cursor-pointer'
        onClick={handleRightClick}
        aria-label="Next Slide"
      />

      <div className='flex absolute z-[100] h-2 top-14 w-full gap-1 px-4'>
        {CarouselImages.map((item, index) => (
          <div
            key={item.id}
            className={`h-2 text-white rounded-full ${currentSlide === index ? 'bg-white w-[20%]' : 'bg-gray-700 w-[20%]'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCarousel;
