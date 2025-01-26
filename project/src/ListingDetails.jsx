import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ListingDetails = ({ listings }) => {
  const { id } = useParams(); // Get the ID from the URL
  const listing = listings.find((item) => item.id === Number(id));

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Listing Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{listing.title}</h1>
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-64 object-cover mb-6 rounded-lg"
      />
      <p className="text-gray-700 mb-4">
        <strong>Location:</strong> {listing.location}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Rent:</strong> {listing.rent}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Duration:</strong> {listing.duration}
      </p>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Additional Comments/Contact Info:</label>
        <textarea
          value={listing.details || 'No additional details provided.'}
          readOnly
          className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          rows="6"
        />
      </div>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Back to Listings
      </Link>
    </div>
  );
};

export default ListingDetails;
