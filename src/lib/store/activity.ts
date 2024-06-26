import { fetchUserPostComments } from "../Actions/post.action";



export async function addActivity(id:string){
    let activity=[];
    const comments=await fetchUserPostComments(id);
    activity.push(comments);
    return activity;
}