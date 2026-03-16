import { useEffect, useState } from 'react';

// 1. Define the type structure for your location state
interface LocationState {
  lat: number | null;
  lng: number | null;
  addressName: string;
}

export default function useUserLocation() {
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lng: null,
    addressName: 'Locating...',
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await res.json();
              setLocation({ lat, lng, addressName: data.display_name });
              console.log(data)
          } catch (error) {
            setLocation({ lat, lng, addressName: 'Location Found' });
            console.log(error)
          }
        },
        (error) => {
          console.error('User denied location or error occurred', error);
          setLocation({ lat: null, lng: null, addressName: 'Please select location' });
          console.log(error)
        }
      );
    }
  }, []);

  return location;
}
