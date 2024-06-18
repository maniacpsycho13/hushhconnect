'use client'
import { getAllJoinRequests, handleJoinRequest } from '@/lib/Actions/community.action';
import React, { useEffect, useState } from 'react';

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
            <h3>Join Requests</h3>
            {joinRequests.length > 0 ? (
                <ul>
                    {joinRequests.map(request => (
                        <li key={request.id}>
                            User: {request.username}, Status: {request.status}, Requested At: {new Date(request.createdAt).toLocaleString()}
                            <br />
                            {request.status !== 'approved' && (
                                <button
                                    className="text-sky-500 hover:text-sky-700 font-semibold text-sm"
                                    onClick={() => handleApprove(request.id)}
                                >
                                    Approve
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No join requests found.</p>
            )}
        </div>
    );
};

export default AllRequests;
