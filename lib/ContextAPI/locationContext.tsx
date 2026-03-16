import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useUserLocation from '../userLocation';

interface LocationService {
    lat: number | null,
    lng: number | null,
    addressName: string
}

export const locationContext = createContext<LocationService>({
    lat: null,
    lng: null,
    addressName: 'Getting your location...'
});

export function useLocation() {
    const context = useContext(locationContext);
    if (!context) {
        console.log('useLocation must be used within LocationContextProvider');
    }
    return context;
}

export default function LocationContextProvider({ children }: { children: ReactNode }) {
    const location = useUserLocation();

    return <locationContext.Provider value={location} >
        {children}
    </locationContext.Provider>
}