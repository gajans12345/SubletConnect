import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    console.log('Fetching listings...');
    try {
      const response = await fetch('http://localhost:3001/api/listings');
      console.log('Response received:', response);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      console.log('Listings data:', data);
      setListings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Unable to load listings. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchListings}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Listings</h1>
      {listings.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No listings available yet.</p>
          <p className="mt-2">Login to post the first listing!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {listing.image && (
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              )}
              <div className="p-4">
                <Link 
                  to={`/listing/${listing.id}`} 
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {listing.title}
                </Link>
                <p className="text-gray-700">{listing.location}</p>
                <p className="text-gray-800 font-medium">{listing.rent}</p>
                <p className="text-gray-600">Duration: {listing.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
