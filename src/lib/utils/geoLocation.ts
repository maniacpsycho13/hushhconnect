
export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export function getCurrentLocation(): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error: GeolocationPositionError) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}