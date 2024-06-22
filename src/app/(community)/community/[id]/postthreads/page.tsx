import CreateThread from "@/components/Community/CreateThread";

export default function Page({params}:{params:{id:string}}) {
  
  return (
    <div className="bg-zinc-100 pt-2"><CreateThread communityId={params.id} /></div>
  )
}
