'use client'

import { updateUserLocation } from '@/lib/Actions/user.action';
import { getCurrentLocation } from '@/lib/utils/geoLocation';
// pages/location.tsx

import React, { useState, useEffect } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const LocationPage = ({userId}:{userId:string}) => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then(async (loc: LocationState) =>{
        setLocation(loc);
        await updateUserLocation(userId,loc.latitude, loc.longitude);
      })
      .catch((err: Error) => setError(err.message));
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading location...</div>;
  }

  return (
    <div>
      <h1>Your Current Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <p>Accuracy: {location.accuracy} meters</p>
    </div>
  );

};

export default LocationPage;