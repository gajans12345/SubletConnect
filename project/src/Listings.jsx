import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Clock, Search } from 'lucide-react';

// WhySubletConnect component
const WhySubletConnect = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SubletConnect?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The trusted platform for University of Waterloo students to find and list subleases, 
            designed specifically for co-op terms and academic schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Building2 className="h-8 w-8" />}
            title="Student-Focused"
            description="Exclusively for UWaterloo students, ensuring relevant listings near campus and student hotspots."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="Co-op Term Friendly"
            description="4-month lease terms aligned with co-op schedules, making it easy to find or sublet during work terms."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Verified Listings"
            description="All listings are from verified UWaterloo students, ensuring safety and reliability."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Listings = ({ listings }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter listings based on search term
  const filteredListings = listings?.filter(listing => {
    const searchLower = searchTerm.toLowerCase();
    return (
      listing.title?.toLowerCase().includes(searchLower) ||
      listing.location?.toLowerCase().includes(searchLower) ||
      listing.rent?.toString().includes(searchTerm) ||
      listing.duration?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      {/* Why SubletConnect Section */}
      <WhySubletConnect />
      
      {/* Existing Listings Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md p-2">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search by location, price, or duration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Listings</h1>
        {!filteredListings || filteredListings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {searchTerm ? (
              <p>No listings found matching your search.</p>
            ) : (
              <>
                <p>No listings available yet.</p>
                <p className="mt-2">Login to post the first listing!</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
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
                  <p className="text-gray-800 font-medium">${listing.rent}</p>
                  <p className="text-gray-600">Duration: {listing.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
