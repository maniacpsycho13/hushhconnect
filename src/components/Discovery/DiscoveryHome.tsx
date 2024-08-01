import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { NewCross, NewExport, NewHeart, NewReload, NewSuper } from '../../../public/NewHome'
import "./TinderCards.css"
import TinderCardCorosel from '@/components/discovery/TinderCardCorosel'
import { getAllUsersSortedByProximity, getUserId } from '@/lib/Actions/user.action'

export type Person = {

  id: string;
  name: string;
  username: string;
  image: string|StaticImageData;
  bio: string;
  latitude: number | null;
  longitude: number | null;
  distance: number | null;
  random_order: number | null;
}



const DiscoveryHome = async() => {

  const Id=await getUserId();
  const person=await getAllUsersSortedByProximity(Id);
  console.log(person);
  

  return (
    <div className='bg-black'>
      <TinderCardCorosel person={person.users}/>
    </div>
  )
}

export default DiscoveryHome