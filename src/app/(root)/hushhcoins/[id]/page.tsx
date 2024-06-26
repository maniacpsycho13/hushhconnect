import HushhCoins from "@/components/HushhCoins/HushhCoins";
import { createReferralbyUserId, getReferralbyAuther } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {

    const session = await auth();
    if(!session || !session.userId) return null;
    let referral=await getReferralbyAuther(session.userId);
    if(!referral){
        await createReferralbyUserId(session.userId);
        referral=await getReferralbyAuther(session.userId);
    }
    if(!referral)return null;
    return (
        <div><HushhCoins coins={referral.auther.coins} referralcode={referral.code} users={referral.users}/></div>
    );
  
}
