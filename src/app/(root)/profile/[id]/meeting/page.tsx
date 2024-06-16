import MeetingScheduler from '@/components/Meeting/Meeting'

export default function page({ params }: { params: { id: string } }) {

    return (
      <div>
         <MeetingScheduler userId={params.id}/>
      </div>
    )
  }
  