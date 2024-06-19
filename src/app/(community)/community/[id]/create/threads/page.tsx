import CreateThread from "@/components/Community/CreateThread";

export default function Page({params}:{params:{id:string}}) {
  
  return (
    <div><CreateThread communityId={params.id} /></div>
  )
}
