import Link from "next/link";
import Image from "next/image";
import "../styles/globals.css";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-300 flex flex-col items-center justify-center p-8">
      {/* Header with fish icon and title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/fish.png"
            alt="Fish Icon"
            width={80}
            height={80}
            className="mr-4 drop-shadow-lg"
          />
          <h1 className="text-6xl font-bold color-black bg-clip-text">
            Fishing Map
          </h1>
        </div>
        <p className="text-xl text-black-600 max-w-md mx-auto">
          Discover the best fishing spots across America with our interactive map
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-row sm:flex-row gap-4 mb-8">
        <Link
          href="/map"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[200px]"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
          </svg>
          Explore Map
        </Link>
        
        <Link
          href="/"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[200px]"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Catalogue
        </Link>
      </div>
    </main>
  );
}
