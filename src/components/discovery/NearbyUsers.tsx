'use client'

import { useState, useEffect } from 'react'
import { User } from '@prisma/client'
import Image from 'next/image'
import { findNearbyUsers, updateUserLocation } from '@/lib/Actions/user.action'
import { getCurrentLocation, LocationResult as LocationState } from '@/lib/utils/geoLocation'

interface NearbyUser extends User {
  distance: number;
  latitude: number | null;
  longitude: number | null;
}

const NearbyUsers = ({ userId }: { userId: string }) => {
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  interface NearbyUsersResponse {
    error?: string;
    success?: string;
    users?: NearbyUser[];
  }

  const fetchNearbyUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await findNearbyUsers(userId, 10);

      if (response.error) {
        setError(response.error);
      } else if (response.users) {
        setNearbyUsers(response.users);
      } else {
        setError('No users found');
      }
    } catch (err) {
      setError('Failed to fetch nearby users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocation = async () => {
    try {
      const location: LocationState = await getCurrentLocation();
      await updateUserLocation(userId, location.latitude, location.longitude);
      fetchNearbyUsers();
      console.log('Location updated');
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNearbyUsers();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nearby Users</h2>
      <button 
        onClick={handleUpdateLocation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Update My Location
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyUsers.map((user) => (
          <div key={user.id} className="border p-4 rounded-lg">
            {user.image && (
              <Image 
                src={user.image} 
                alt={user.name || 'User'} 
                width={64} 
                height={64} 
                className="rounded-full mb-2"
              />
            )}
            <h3 className="font-bold">{user.name || 'Anonymous'}</h3>
            <p>@{user.username}</p>
            <p>{user.distance.toFixed(2)} km away</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NearbyUsers
