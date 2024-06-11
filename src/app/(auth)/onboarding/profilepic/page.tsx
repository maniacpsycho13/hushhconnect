import SimpleSlider from "@/components/Corousel/CenterMode";
import { ProfilePicForm } from "@/components/form/AuthForm/Onboarding/ProfilePicForm";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
    const session =await auth();
    if(!session || !session.userId){
        return null
    }
  return (
   
    <div>
      <div className='mt-[70px] flex flex-col justify-center items-center '>
        <p className='text-[#1A1C29] text-[20px] font-bold text-center'>Final Touches</p>
        <p className='text-[#797979] text-center text-[15px] py-[8px] mx-[2.5rem] font-[400]'>Finish off your hushh with a profile picture and bio.</p>

        <SimpleSlider/>
        
    </div>
    <ProfilePicForm id={session.userId}/>
    </div>
  )
}
