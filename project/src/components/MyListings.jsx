import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyListings = ({ userEmail }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/listings/my-listings?email=${encodeURIComponent(userEmail)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      
      const data = await response.json();
      console.log('Fetched listings:', data); // Debug log
      setListings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchListings();
    }
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        console.log(`Attempting to delete listing ${id}`); // Debug log
        const response = await fetch(
          `http://localhost:3001/api/listings/${id}?userEmail=${encodeURIComponent(userEmail)}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete listing');
        }

        console.log(`Successfully deleted listing ${id}`); // Debug log
        // Refresh the listings after successful deletion
        fetchListings();
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">You haven't posted any listings yet.</p>
        <Link 
          to="/post"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Your First Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="border rounded-lg shadow-sm overflow-hidden">
            {listing.image && (
              <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-lg font-medium">${listing.rent}</p>
              <p className="text-gray-500">Duration: {listing.duration}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;