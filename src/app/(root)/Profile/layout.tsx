"use client"
import LowerNavbar from '@/components/LowerNavbar/LowerNavbar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        {children}
        <LowerNavbar/>
    </div>
  )
}

export default Layout
