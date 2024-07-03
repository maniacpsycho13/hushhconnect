import MeetingScheduler from '@/components/Meeting/Meeting'
import Image from 'next/image'
import { underConstruction } from '../../../../../../public/community'
import Development from '@/components/UnderDevelopment/Development'

export default function page({ params }: { params: { id: string } }) {

    return (
      <div className='bg-zinc-100 pb-24 pt-4'>
        <Development/>
         {/* <MeetingScheduler userId={params.id}/> */}
      </div>
    )
  }
  