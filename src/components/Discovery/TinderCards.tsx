"use client";
import React, { useState, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Image, { StaticImageData } from 'next/image';
import Testing2 from '../../../public/Testing/Testing2.jpg';
import Testing3 from '../../../public/Testing/Testing3.jpg';
import Testing4 from '../../../public/Testing/Testing4.jpg';
import { ColoredNewCross, ColoredNewHeart, connectLogo, NewCross, NewExport, NewHeart, NewNotification, NewReload, NewSearch, NewSuper } from '../../../public/NewHome';
import { findNearbyUsers, getRandomUsers, getUserId } from '@/lib/Actions/user.action';

interface Person {
    name: string;
    image: string | StaticImageData;
    bio: string;
}

interface SwipeInfo {
    direction: 'LIKE' | 'NOPE';
    name: string;
}

type TinderCardType = {
    swipe: (dir: string) => void;
};

interface UserResponse {
    id: string;
    name: string;
    image: string;
    bio: string;
}

interface ProximityResponse {
    success?: string;
    users?: UserResponse[];
    error?: string;
}

const TinderCards = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const Id = await getUserId();
                if(!Id) return;
                const personData: any = await getRandomUsers(Id);

                if (personData.users) {
                    setPeople(
                        personData.users?.map((user:any) => ({ name: user.name, image: user.image, bio: user.bio })) ?? []
                    );
                    setLoading(false);
                } else {
                    console.error(personData.error);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchPersons();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(people.length - 1);
    const [swipeInfo, setSwipeInfo] = useState<SwipeInfo | null>(null);
    const tinderCardRefs = useRef<(TinderCardType | null)[]>([]);

    useEffect(() => {
        setCurrentIndex(people.length - 1);
    }, [people]);

    const fetchMorePersons = async () => {
        try {
            const Id = await getUserId();
            if(!Id) return;
            const personData: any = await getRandomUsers(Id);

            if (personData.users) {
                setPeople((prevPeople) => [
                    ...prevPeople,
                    ...personData.users?.map((user:any) => ({ name: user.name, image: user.image, bio: user.bio })) ?? []
                ]);
            } else {
                console.error(personData.error);
            }
        } catch (error) {
            console.error('Failed to fetch more users:', error);
        }
    };

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
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex - 1;
                if (newIndex < 7) { // Threshold to load more users
                    fetchMorePersons();
                }
                return newIndex;
            });
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

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>;
    }

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
                    <div className='absolute text-white bottom-40 px-6 py-3 bg-gradient-to-t from-black shadow-2xl w-full'>
                        <h3 className='text-base font-bold mb-2'>{person.name}</h3>
                        <p className='text-xs w-full'>{person.bio}</p>
                    </div>
                </TinderCard>
            ))}
        </div>
    );
}

export default TinderCards;
