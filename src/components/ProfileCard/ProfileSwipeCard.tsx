"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Testing3 from '../../../public/Testing/Testing3.jpg';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProfileSwipeCard = () => {
    return (
        <div className='relative w-screen h-screen max-w-[460px]'>
            <div className='bg-black px-6 pt-4 pb-2'>
                <h1 className='text-base text-red-600 font-bold'>HUSHH CONNECT</h1>
            </div>
            <div className='relative w-full h-[85%]'>
                <Image
                    src={Testing3}
                    alt='person'
                    layout='fill'
                    objectFit='cover'
                    className='absolute top-0 left-0'
                />
            </div>
            <div className='absolute text-white bottom-[3.5rem] px-6 py-3 bg-gradient-to-t from-black shadow-2xl'>
                <h3 className='text-base font-bold mb-2'>Lana Rodes</h3>
                <p className='text-xs'>
                    Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.
                </p>
            </div>
        </div>
    );
};

const App = () => {
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const CarouselImages = [
        { id: 1, content: () => <ProfileSwipeCard /> },
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

export default App;
