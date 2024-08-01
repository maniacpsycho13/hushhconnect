import Image from 'next/image'
import React from 'react'

import { NewCross, NewExport, NewHeart, NewReload, NewSuper } from '../../../public/NewHome'
import "./TinderCards.css"
import TinderCardCorosel from '@/components/discovery/TinderCardCorosel'

const DiscoveryHome = () => {

  return (
    <div className='bg-black'>
      <TinderCardCorosel/>
    </div>
  )
}

export default DiscoveryHome