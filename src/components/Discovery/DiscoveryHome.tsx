import Image from 'next/image'
import React from 'react'

import { NewCross, NewExport, NewHeart, NewReload, NewSuper } from '../../../public/NewHome'
import TinderCards from './TinderCards'
import "./TinderCards.css"

const DiscoveryHome = () => {

  return (
    <div className='bg-black'>
      <TinderCards/>
    </div>
  )
}

export default DiscoveryHome