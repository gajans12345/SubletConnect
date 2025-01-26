import React from 'react';
import { Link } from 'react-router-dom';

const Listings = ({ listings }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link to={`/listing/${listing.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {listing.title}
              </Link>
              <p className="text-gray-700">{listing.location}</p>
              <p className="text-gray-800 font-medium">{listing.rent}</p>
              <p className="text-gray-600">Duration: {listing.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
