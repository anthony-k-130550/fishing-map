'use client';

import Image from "next/image";
import "../styles/globals.css";
import Map from "../components/Map";
import { useEffect, useState } from 'react';

export default function Home() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch('/api/spots')
    .then((response) => response.json())
    .then((data) => setSpots(data)) 
    .catch(console.error);
  }, []);
  
  return (
    <main className="p-6">
      <h1 className = "text-3xl font-bold mb-6">Fishing Spots in America</h1>
      <Map spots={spots} />
    </main>
  );
}
