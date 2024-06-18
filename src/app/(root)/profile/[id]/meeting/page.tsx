import MeetingScheduler from '@/components/Meeting/Meeting'

export default function page({ params }: { params: { id: string } }) {

    return (
      <div className='bg-zinc-100'>
         <MeetingScheduler userId={params.id}/>
      </div>
    )
  }
  