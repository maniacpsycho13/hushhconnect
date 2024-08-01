"use client"
import Image from 'next/image';
import React, { useEffect } from 'react';
import Testing3 from '../../../public/Testing/Testing3.jpg';
import axios from 'axios';

interface ProfileSwipeCardProps {
  id: string;
  username: string | null;
  profilePic: string | null;
  bio: string | null;
  email: string | null;
  name: string | null;
  lastname: string | null;
  socialmedia?: any;
  coins: number;
  posts?: any;
}

const ProfileSwipeCard: React.FC<ProfileSwipeCardProps> = (props) => {
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.post('/api/create-pass', {
          email: props.email,
          id: props.id,
          name: props.name,
        });
        // setGoogleWallet(response.data.saveUrl);
      } catch (error) {
        console.error('Error creating pass:', error);
      }
    };
    handleSubmit();
  }, [props.email, props.id, props.name]);

  return (
    <div className='relative w-screen h-screen max-w-[460px] bg-black'>
      <div className='bg-black px-6 pt-4 pb-2'>
        <h1 className='text-base text-red-600 font-bold'>HUSHH CONNECT</h1>
      </div>
      <div className='relative w-full h-[85%]'>
        <Image
          src={props.profilePic || Testing3}
          alt='person'
          layout='fill'
          objectFit='cover'
          className='absolute top-0 left-0'
        />
      </div>
      <div className='absolute text-white bottom-[3.5rem] px-6 py-3 bg-gradient-to-t from-black shadow-2xl'>
        <h3 className='text-base font-bold mb-2'>{props.name}{" "}{props.lastname}</h3>
        <p className='text-xs'>
          Frontend developer specializing in React and UI/UX design. Passionate about crafting intuitive, high-performance web applications and innovative user interfaces.
        </p>
      </div>
    </div>
  );
};

export default ProfileSwipeCard;
