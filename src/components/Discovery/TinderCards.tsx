"use client"
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import Image from 'next/image';
import Testing2 from '../../../public/Testing/Testing2.jpg';
import Testing3 from '../../../public/Testing/Testing3.jpg';
import Testing4 from '../../../public/Testing/Testing4.jpg';
import { NewCross, NewExport, NewHeart, NewReload, NewSuper } from '../../../public/NewHome';

const TinderCards = () => {
    const [people, setPeople] = useState([
        { name: 'Lana Rodes', image: Testing2, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' },
        { name: 'Leah Gotti', image: Testing3, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' },
        { name: 'Dani Daniels', image: Testing4, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' }
    ]);

    const [swipeInfo, setSwipeInfo] = useState(null);
    const [swipeClass, setSwipeClass] = useState('');

    const handleSwipe = (direction, name) => {
        if (direction === 'right') {
            setSwipeInfo({ direction: 'LIKE', name });
            setSwipeClass('swipe-like');
        } else if (direction === 'left') {
            setSwipeInfo({ direction: 'NOPE', name });
            setSwipeClass('swipe-nope');
        } else {
            setSwipeInfo(null);
            setSwipeClass('');
        }

        setTimeout(() => {
            setSwipeInfo(null);
            setSwipeClass('');
        }, 500); // Adjust the timeout duration as needed
    };

    return (
        <div className='relative w-screen h-screen bg-black max-w-[460px]'>
            <div className='fixed bottom-12 w-full flex justify-between px-7 py-4 bg-black z-20'>
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

            {people.map(person => (
                <TinderCard
                    className="absolute w-full h-full"
                    key={person.name}
                    preventSwipe={['down', 'up']}
                    onSwipe={(dir) => handleSwipe(dir, person.name)}
                >
                    <div className='relative w-full h-[80%]'>
                        <Image
                            src={person.image}
                            alt={person.name}
                            layout='fill'
                            objectFit='cover'
                            className='absolute top-0 left-0'
                        />
                    </div>
                    <div className='absolute text-white bottom-28 px-6 py-3 bg-gradient-to-t from-black to black shadow-2xl'>
                        <h3 className='text-base font-bold mb-2'>{person.name}</h3>
                        <p className='text-xs'>{person.bio}</p>
                    </div>
                </TinderCard>
            ))}

            {swipeInfo && (
                <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold`}>
                    {swipeInfo.direction}
                </div>
            )}
        </div>
    );
}

export default TinderCards;
