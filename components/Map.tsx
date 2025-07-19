'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'; // import styles

type Spot = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

type MapProps = {
    spots: Spot[];
}

export default function Map({ spots }: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        if (mapInstance.current) return;

        mapInstance.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/landscape/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
            center: [-98.5795, 39.8283], // Initial center
            zoom: 3, // Initial zoom level
        });

        return () => {
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
        }, []);

    useEffect(() => {
        if (!mapInstance.current) return;

        const container = mapContainer.current!;
        container.querySelectorAll('.marker').forEach((marker) => marker.remove());

        spots.forEach((spot) => {
            const popup = new maplibregl.Popup({ offset: 25 }).setText(spot.name);

            const marker = new maplibregl.Marker({className: 'marker'})
                .setLngLat([spot.longitude, spot.latitude])
                .setPopup(popup)
                .addTo(mapInstance.current!);
        });
    }, [spots]);

    return (
        <div
            ref={mapContainer}
            className="shadow-lg"
            style={{ height: '500px', width: '100%', borderRadius: '8px' }}
        />
    );
    }