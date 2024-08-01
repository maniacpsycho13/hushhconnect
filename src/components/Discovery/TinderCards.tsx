"use client";
import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import Image from 'next/image';
import Testing2 from '../../../public/Testing/Testing2.jpg';
import Testing3 from '../../../public/Testing/Testing3.jpg';
import Testing4 from '../../../public/Testing/Testing4.jpg';
import { ColoredNewCross, ColoredNewHeart, connectLogo, NewCross, NewExport, NewHeart, NewNotification, NewReload, NewSearch, NewSuper } from '../../../public/NewHome';

interface Person {
    name: string;
    image: StaticImageData;
    bio: string;
}

interface SwipeInfo {
    direction: 'LIKE' | 'NOPE';
    name: string;
}

type TinderCardType = {
    swipe: (dir: string) => void;
};

const TinderCards: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([
        { name: 'Alia', image: Testing2, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' },
        { name: 'kiara', image: Testing3, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' },
        { name: 'Rashmika', image: Testing4, bio: 'Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.' }
    ]);

    const [currentIndex, setCurrentIndex] = useState(people.length - 1);
    const [swipeInfo, setSwipeInfo] = useState<SwipeInfo | null>(null);
    const tinderCardRefs = useRef<(TinderCardType | null)[]>([]);

    const handleSwipe = (direction: string, name: string) => {
        if (direction === 'right') {
            setSwipeInfo({ direction: 'LIKE', name });
        } else if (direction === 'left') {
            setSwipeInfo({ direction: 'NOPE', name });
        } else {
            setSwipeInfo(null);
        }

        setTimeout(() => {
            setPeople((prevPeople) => prevPeople.filter(person => person.name !== name));
            setSwipeInfo(null);
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }, 1000);
    };

    const handleCardLeftScreen = (name: string) => {
        setSwipeInfo(null);
    };

    const swipe = (dir: string) => {
        if (currentIndex >= 0 && currentIndex < tinderCardRefs.current.length) {
            const cardToSwipe = tinderCardRefs.current[currentIndex];
            if (cardToSwipe) {
                cardToSwipe.swipe(dir);
            }
        }
    };

    return (
        <div className='relative w-screen h-screen max-w-[460px]'>
            <div className='bg-black px-6 pt-4 pb-3 flex justify-between items-center'>
                <div>
                    <Image src={connectLogo} alt='logo' />
                </div>
                <div className='flex gap-4 items-center'>
                    <div>
                        <Image src={NewSearch} alt='search' />
                    </div>
                    <div className=''>
                        <Image src={NewNotification} alt='notification' />
                    </div>
                </div>
            </div>
            <div className='fixed bottom-12 w-full flex items-center justify-between px-7 py-2 z-[100]'>
                <div className='' onClick={() => window.location.reload()}>
                    <Image src={NewReload} alt='reload' height={46} width={48} />
                </div>
                <div className='' onClick={() => swipe('left')}>
                    <Image src={swipeInfo && swipeInfo.direction === 'NOPE' ? ColoredNewCross : NewCross} alt='cross' height={57} width={57} />
                </div>
                <div className=''>
                    <Image src={NewSuper} alt='super' height={46} width={46} />
                </div>
                <div className='' onClick={() => swipe('right')}>
                    <Image src={swipeInfo && swipeInfo.direction === 'LIKE' ? ColoredNewHeart : NewHeart} alt='heart' height={57} width={57} />
                </div>
                <div className=''>
                    <Image src={NewExport} alt='export' height={44} width={44} />
                </div>
            </div>

            {people.map((person, index) => (
                <TinderCard
                    className="absolute w-full h-full"
                    key={person.name}
                    preventSwipe={['down', 'up']}
                    onSwipe={(dir) => handleSwipe(dir, person.name)}
                    onCardLeftScreen={() => handleCardLeftScreen(person.name)}
                    ref={(el) => (tinderCardRefs.current[index] = el)}
                >
                    <div className='relative w-full h-[75%]'>
                        <Image
                            src={person.image}
                            alt={person.name}
                            layout='fill'
                            objectFit='cover'
                            className='absolute top-0 left-0 rounded-xl'
                        />
                        {swipeInfo && swipeInfo.name === person.name && (
                            <div className='absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold'>
                                {swipeInfo.direction}
                            </div>
                        )}
                    </div>
                    <div className='absolute text-white bottom-40 px-6 py-3 bg-gradient-to-t from-black shadow-2xl'>
                        <h3 className='text-base font-bold mb-2'>{person.name}</h3>
                        <p className='text-xs'>{person.bio}</p>
                    </div>
                </TinderCard>
            ))}
        </div>
    );
}

export default TinderCards;
