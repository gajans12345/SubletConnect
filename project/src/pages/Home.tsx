import React from 'react';
import { Search, MapPin, Calendar, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Find Your Perfect Waterloo Sublease
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The easiest way for University of Waterloo students to find and post subleases
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-lg shadow-md p-2">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search by location, price, or amenities..."
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<MapPin className="h-8 w-8 text-blue-600" />}
          title="Location-Based Search"
          description="Find subleases near campus, popular student areas, or specific locations"
        />
        <FeatureCard
          icon={<Calendar className="h-8 w-8 text-blue-600" />}
          title="Flexible Duration"
          description="Perfect for co-op terms with 4-month lease periods and flexible move-in dates"
        />
        <FeatureCard
          icon={<HomeIcon className="h-8 w-8 text-blue-600" />}
          title="Verified Listings"
          description="All listings are posted by verified UWaterloo students"
        />
      </section>

      {/* Recent Listings Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Listings</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Add listing previews here */}
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Home;