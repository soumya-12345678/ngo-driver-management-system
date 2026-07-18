import { useState, useCallback } from 'react';

interface LocationState {
  lat: number | null;
  lng: number | null;
  loading: boolean;
  error: string | null;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lng: null,
    loading: false,
    error: null,
  });

  const getLocation = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocation(prev => ({ ...prev, error: 'Geolocation not supported' }));
        resolve(null);
        return;
      }

      setLocation(prev => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation({
            ...coords,
            loading: false,
            error: null,
          });
          resolve(coords);
        },
        (error) => {
          setLocation(prev => ({
            ...prev,
            loading: false,
            error: error.message,
          }));
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }, []);

  return { ...location, getLocation };
}
