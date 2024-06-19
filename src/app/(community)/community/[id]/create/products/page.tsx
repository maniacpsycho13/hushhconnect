import AddCart from "@/components/form/AddCart";

export default function Page({params}:{params:{id:string}}) {
  return (
    <div><AddCart communityId={params.id}/></div>
  )
}
