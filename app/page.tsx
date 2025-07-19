import Image from "next/image";
import "../styles/globals.css";
import Map from "../components/Map";

const locations = [
  { id: '1', name: 'Lake Tahoe', latitude: 39.0968, longitude : -120.0324 },
  { id: '2', name: 'Florida Keys', latitude: 24.5551, longitude : -81.7800 },
  { id: '3', name: 'Lake Erie', latitude: 41.7325, longitude : -80.2995 },
];

export default function Home() {
  return (
    <main className="p-6">
      <h1 className = "text-3xl font-bold mb-6">Fishing Spots in America</h1>
      <Map spots={locations} />
    </main>
  );
}
