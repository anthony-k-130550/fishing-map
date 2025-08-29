'use client';

import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.css";
import Map from "../../components/Map";
import { useEffect, useState, useRef } from 'react';

type FishType = {
  id: number;
  name: string;
};

type Spot = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  fishType: FishType[];
};

export default function Home() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [fishTypes, setFishTypes] = useState<FishType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locationFormRef = useRef<HTMLFormElement>(null);
  const filterFormRef = useRef<HTMLFormElement>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetch the spots from the API so the page knows what spots to display
  useEffect(() => {
    fetch('/api/spots')
    .then((response) => response.json())
    .then((data) => setSpots(data)) 
    .catch(console.error);
  }, []);

  // same with the fish types
  useEffect(() => {
    fetch('/api/fish-types')
    .then((response) => response.json())
    .then((data) => setFishTypes(data))
    .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget); //get the form data from the React.FormEvent
    const selectedFishTypeIds = Array.from(formData.getAll('fishType')).map(id => parseInt(id as string));
    
    const spotData = {
      name: formData.get('name') as string,
      latitude: parseFloat(formData.get('latitude') as string),
      longitude: parseFloat(formData.get('longitude') as string),
      description: formData.get('description') as string,
      fishTypeIds: selectedFishTypeIds,
    };
    
    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
      });
      
      if (response.ok) {
        const newSpot = await response.json();
        setSpots([...spots, newSpot]);
        setShowAddForm(false);
        // Reset form safely using ref
        if (locationFormRef.current) {
          locationFormRef.current.reset();
        }
      } else {
        const errorData = await response.json();
        console.error('Error adding spot:', errorData.error);
      }
    } catch (error) {
      console.error('Error adding spot:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {

  };
  
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

          <button onClick={() => setIsFiltering(true)} 
          className = "flex items-center space-x-2 bg-white hover:bg-gray-50 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors border-2 border-blue-600 shadow-sm">
            <span>Filter</span>
          </button>
          
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
          <div className="bg-white rounded-xl p-6 shadow-2xl max-w-md relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Add New Fishing Spot</h2>
            
            <form ref={locationFormRef} className="space-y-4" onSubmit={handleSubmit}>
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

              {/* Fish Types Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fish Types
                </label>
                <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {fishTypes.map((fishType) => (
                    <label key={fishType.id} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        name="fishType"
                        value={fishType.id}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{fishType.name}</span>
                    </label>
                  ))}
                </div>
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
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Adding...' : 'Add Spot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFiltering && (
          <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-2xl w-[90%] max-w-md relative"> 
              <button
                onClick={() => setIsFiltering(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
              >
                &times;
              </button>
              <h1 className="block text-lg font-bold text-black-900 mb-1">Filters</h1>
              <form ref={filterFormRef} className="space-y-4" onSubmit={handleFilter}>
                <div className="flex justify-evenly items-center">
                  <label htmlFor="latitude" className="block text-md font-medium text-gray-700 mb-1">
                      Latitude
                  </label>
                  <input
                    type="number"
                    id="minLatitude"
                    name="minLatitude"
                    required
                    step="any"
                    className="w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="min latitude"
                  />
                  <input
                    type="number"
                    id="maxLatitude"
                    name="maxLatitude"
                    required
                    step="any"
                    className="w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="max latitude"
                  />  
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFiltering(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Filtering..' : 'Filter'}
                  </button>
              </div>
              </form>
          </div>
        </div>
      )}
    </main>
  );
}
