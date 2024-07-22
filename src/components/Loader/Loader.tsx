"use client"
import React, { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';

const hushhThoughts = [
  "Innovating the future of communication.",
  "Empowering seamless interactions.",
  "Building bridges through technology.",
  "Pioneering AI-driven solutions.",
  "Enhancing user experience with cutting-edge design.",
  "Streamlining processes for better efficiency.",
  "Connecting people with intuitive tools.",
  "Revolutionizing the way we connect.",
  "Transforming ideas into reality.",
  "Leveraging AI for smarter connections.",
  "Fostering collaboration and growth.",
  "Simplifying complex communication.",
  "Bridging gaps with intelligent technology.",
  "Delivering personalized user experiences.",
  "Driving innovation with AI capabilities.",
  "Crafting solutions for modern problems.",
  "Optimizing interactions with advanced tech.",
  "Creating value through smart connections.",
  "Empowering businesses with AI tools.",
  "Innovating for a connected future."
];

const Loader = () => {
  const [randomThought, setRandomThought] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * hushhThoughts.length);
    setRandomThought(hushhThoughts[randomIndex]);
  }, []);

  return (
    <div className='bg-white flex flex-col mt-24 items-center h-screen'>
      <div className='flex justify-center items-center flex-col mt-4'>
        <FadeLoader color="rgba(200, 73, 168, 1)" />
      </div>
      <div className='mt-4 text-center'>
        <p className='text-gray-700 text-lg font-semibold'>{randomThought}</p>
      </div>
    </div>
  );
}

export default Loader;
