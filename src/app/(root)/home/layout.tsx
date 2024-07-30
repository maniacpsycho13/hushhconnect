"use client"
import { useState } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [activeLink, setActiveLink] = useState('/thread');

  return (
    <div className=''>
    
      <div>{children}</div>
    </div>
  );
};

export default Layout;
