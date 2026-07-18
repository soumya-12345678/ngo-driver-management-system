import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { haversineDistance } from '@/lib/utils';

type LatLng = { lat: number; lng: number };

export function DriverMap({ autoStart = true }: { autoStart?: boolean }) {
  const [tracking, setTracking] = useState(autoStart);
  const [path, setPath] = useState<LatLng[]>([]);
  const watchIdRef = useRef<number | null>(null);
  const [distanceMeters, setDistanceMeters] = useState(0);

  useEffect(() => {
    if (!tracking) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (!('geolocation' in navigator)) return;

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const coord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPath((prev) => {
          const next = [...prev, coord];
          // compute incremental distance
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            const d = haversineDistance(last.lat, last.lng, coord.lat, coord.lng);
            setDistanceMeters((m) => m + d);
          }
          // persist latest trip data
          try {
            localStorage.setItem('lastTripPath', JSON.stringify(next));
            localStorage.setItem('lastTripDistance', String(Math.round(distanceMeters)));
          } catch (e) {}
          return next;
        });
      },
      (err) => {
        console.error('Geolocation error', err);
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
    );

    watchIdRef.current = id as unknown as number;

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking]);

  const handleStartStop = () => {
    setTracking((t) => !t);
    if (tracking) {
      // stopped
      try {
        localStorage.setItem('lastTripDistance', String(Math.round(distanceMeters)));
      } catch (e) {}
    } else {
      // starting new trip
      setPath([]);
      setDistanceMeters(0);
    }
  };

  const center = path.length > 0 ? path[path.length - 1] : { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="h-64 rounded-md overflow-hidden mb-3">
        <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {path.length > 0 && (
            <Polyline positions={path.map(p => [p.lat, p.lng]) as any} color="#2563eb" />
          )}
          {path.length > 0 && (
            <Circle center={[center.lat, center.lng]} radius={6} pathOptions={{ color: '#ef4444' }} />
          )}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Distance</p>
          <p className="font-semibold">{(distanceMeters / 1000).toFixed(2)} km</p>
        </div>

        <div>
          <button onClick={handleStartStop} className="px-3 py-2 rounded bg-primary text-white">
            {tracking ? 'Stop' : 'Start'} Tracking
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriverMap;
