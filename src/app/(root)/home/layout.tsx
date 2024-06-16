"use client"
import { useState } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [activeLink, setActiveLink] = useState('');

  return (
    <div>
      <div className='px-6 pt-4'>
        <div className='flex justify-between items-center'>
          <div className="bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] text-xl font-semibold">Hushh Connect</div>
          <div className='flex gap-[26px] pt-[6px]'>
            <Link href='/thread'>
              <div
                className={`text-sm font-medium leading-[22.91px] ${activeLink === '/thread' ? 'text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveLink('/thread')}
              >
                Thread
              </div>
            </Link>
            <Link href='/product'>
              <div
                className={`text-sm font-medium leading-[22.91px] ${activeLink === '/product' ? 'text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveLink('/product')}
              >
                Product
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
