'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'; // import styles
import { useState } from 'react';

type FishType = {
    id: number;
    name: string;
}

type Spot = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
    fishType: FishType[];  // Now an array of FishType objects
}

type MapProps = {
    spots: Spot[];
}

export default function Map({ spots }: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

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
            const marker = new maplibregl.Marker({className: 'marker'})
                .setLngLat([spot.longitude, spot.latitude])
                .addTo(mapInstance.current!);

            marker.getElement().addEventListener('click', () => {
                setSelectedSpot(spot);
            });
        });
    }, [spots]);

    return (
        <div className="relative">
            {/* Map container */}
            <div
            ref={mapContainer}
            className="shadow-lg"
            style={{ height: '500px', width: '100%', borderRadius: '8px' }}
            />

            {/* Modal overlay when a spot is selected */}
            {selectedSpot && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-2xl w-[90%] max-w-md relative">
                        <button
                            onClick={() => setSelectedSpot(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-2">{selectedSpot.name}</h2>
                        <p className="text-gray-600 mb-1">
                            <strong>Latitude:</strong> {selectedSpot.latitude}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Longitude:</strong> {selectedSpot.longitude}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Description:</strong> {selectedSpot.description || 'N/A'}
                        </p>
                        {selectedSpot.fishType && selectedSpot.fishType.length > 0 && (
                            <p className="text-gray-600">
                                <strong>Fish types:</strong> {selectedSpot.fishType.map(fish => fish.name).join(', ')}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}