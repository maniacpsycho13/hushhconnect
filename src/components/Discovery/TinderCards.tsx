"use client"
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import Image from 'next/image';
import Testing2 from '../../../public/Testing/Testing2.jpg';
import Testing3 from '../../../public/Testing/Testing3.jpg';
import Testing4 from '../../../public/Testing/Testing4.jpg';
import { NewCross, NewExport, NewHeart, NewReload, NewSuper } from '../../../public/NewHome';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TinderCards = () => {
    const [people, setPeople] = useState([
        { name: 'Lana Rodes', image: Testing2, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' },
        { name: 'Leah Gotti', image: Testing3, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' },
        { name: 'Dani Daniels', image: Testing4, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' }
    ]);

    const [swipeInfo, setSwipeInfo] = useState(null);

    const handleSwipe = (direction, name) => {
        if (direction === 'right') {
            setSwipeInfo({ direction: 'LIKE', name });
        } else if (direction === 'left') {
            setSwipeInfo({ direction: 'NOPE', name });
        } else {
            setSwipeInfo(null);
        }
    };

    const handleCardLeftScreen = (name) => {
        setSwipeInfo(null);
    };

    return (
        <div className='relative w-screen h-screen max-w-[460px]'>
            <div className='fixed bottom-12 w-full flex justify-between px-7 py-4 z-20'>
                <div className='bg-gray-600 rounded-full p-2 shadow-xl'>
                    <Image src={NewReload} alt='reload' height={28} width={28} />
                </div>
                <div className='bg-gray-600 rounded-full p-2 shadow-xl'>
                    <Image src={NewCross} alt='cross' height={28} width={28} />
                </div>
                <div className='bg-gray-600 rounded-full p-2 shadow-xl'>
                    <Image src={NewSuper} alt='super' height={28} width={28} />
                </div>
                <div className='bg-gray-600 rounded-full p-2 shadow-xl'>
                    <Image src={NewHeart} alt='heart' height={28} width={28} />
                </div>
                <div className='bg-gray-600 rounded-full p-2 shadow-xl'>
                    <Image src={NewExport} alt='export' height={24} width={24} />
                </div>
            </div>

            {people.map((person, index) => (
                <TinderCard
                    className="absolute w-full h-full"
                    key={person.name}
                    preventSwipe={['down', 'up']}
                    onSwipe={(dir) => handleSwipe(dir, person.name)}
                    onCardLeftScreen={() => handleCardLeftScreen(person.name)}
                >
                    <div className='relative w-full h-[80%]'>
                        <Image
                            src={person.image}
                            alt={person.name}
                            layout='fill'
                            objectFit='cover'
                            className='absolute top-0 left-0'
                        />
                        {swipeInfo && swipeInfo.name === person.name && (
                            <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold`}>
                                {swipeInfo.direction}
                            </div>
                        )}
                    </div>
                    <div className='absolute text-white bottom-28 px-6 py-3 bg-gradient-to-t from-black shadow-2xl'>
                        <h3 className='text-base font-bold mb-2'>{person.name}</h3>
                        <p className='text-xs'>{person.bio}</p>
                    </div>
                </TinderCard>
            ))}
        </div>
    );
}

const App = () => {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const CarouselImages = [
        {
            id: 1,
            content: () => <TinderCards />
        },
        {
            id: 2,
            content: () => <div className='flex items-center justify-center w-full h-full text-white text-6xl'>hii</div>
        },
        {
            id: 3,
            content: () => <div className='flex items-center justify-center w-full h-full text-white text-6xl'>hello</div>
        }
    ];

    return (
        <Carousel 
            responsive={responsive}
            arrows={true}
            swipeable={false}
            draggable={false}>
            {CarouselImages.map((item) => (
                <div key={item.id} className="w-full h-full">
                    {item.content()}
                </div>
            ))}
        </Carousel>
    );
};

export default App;
