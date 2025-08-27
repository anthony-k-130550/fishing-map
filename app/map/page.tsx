'use client';

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css";
import Map from "../../components/Map";
import { useEffect, useState } from 'react';

export default function Home() {
  const [spots, setSpots] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch('/api/spots')
    .then((response) => response.json())
    .then((data) => setSpots(data)) 
    .catch(console.error);
  }, []);
  
  return (
    <main className="p-6">
      {/* Header with title and navigation buttons */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Fishing Spots in America</h1>
        
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors border-2 border-blue-600 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </Link>
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Location</span>
          </button>
        </div>
      </div>

      <Map spots={spots} />

      {/* Add Location Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-[90%] max-w-md relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Add New Fishing Spot</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Spot Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Lake Tahoe"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    required
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="39.0968"
                  />
                </div>
                
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    required
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="-120.0324"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the fishing spot..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Spot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
