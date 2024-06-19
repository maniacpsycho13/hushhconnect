'use client'
import { getAllJoinRequests, handleJoinRequest } from '@/lib/Actions/community.action';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { hushhprofile } from '../../../public/profile';

type JoinRequest = {
    id: string;
    userId: string;
    username: string | null;
    status: string;
    createdAt: Date;
};
type JoinRequestsResult = JoinRequest[] | { error: string };
const AllRequests = ({ communityId , userid}: { communityId: string, userid: string }) => {
    const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
    const [error, setError] = useState<string | undefined>('');
    useEffect(() => {
        const fetchJoinRequests = async () => {
            const result = await getAllJoinRequests(communityId);
            if ('error' in result) {
                setError(result.error);
                console.log('Error fetching join requests:', result.error);
                
            }else{
                setJoinRequests(result);
            }
        };

        fetchJoinRequests();
    }, [communityId]);

    const handleApprove = async (joinRequestId: string ) => {
        const result = await handleJoinRequest(joinRequestId,"approved", userid);
        if ('error' in result) {
            setError(result.error);
            console.log('Error approving join request:', result.error);
        } else {
            setJoinRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === joinRequestId ? { ...request, status: 'approved' } : request
                )
            );
        }
    };

    return (
        <div>
            <div className="text-black text-sm font-medium mt-[24px]">Join Requests</div>
            {joinRequests.length > 0 ? (
                <div className=' mt-[12px]'>
                    {joinRequests.map(request => (
                        <div key={request.id} className='w-full bg-white my-2 px-[12.92px] justify-between rounded-xl py-[12px] flex items-center '>
                            {/* User: {request.username}, Status: {request.status}, Requested At: {new Date(request.createdAt).toLocaleString()} */}
                           
                                <div className='flex items-center gap-[8px]'>
                                <div>
                                    <Image src={hushhprofile} alt='profile' className='h-[40px] w-[40px]'></Image>
                                </div>
                                <div className='flex flex-col '>
                                    <div className="text-black text-xs font-medium ">{request.username}</div>
                                    <div className="text-xs font-normal bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">Status: {request.status}</div>
                                </div>
                                </div>
                            
                            <br />
                            {request.status !== 'approved' && (
                                <button
                                    className="h-[26px] p-2 rounded-[10px] text-white text-xs bg-gradient-to-l from-rose-600 to-blue-700   justify-center items-center gap-2.5 inline-flex"
                                    onClick={() => handleApprove(request.id)}
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No join requests found.</p>
            )}
        </div>
    );
};

export default AllRequests;
