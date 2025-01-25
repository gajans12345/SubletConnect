import React from 'react';
import { Building2, Search, Calendar, MessageSquare, Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Sublease at UWaterloo
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              The easiest way to find or list subleases for University of Waterloo students.
              Designed specifically for co-op terms and student housing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                List Your Space
              </button>
              <button className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors">
                Find a Sublease
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Location (e.g., UW Plaza, King Street)"
                className="w-full px-4 py-2 border rounded-lg pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg pl-10"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Search Subleases
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SubletConnect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Building2 className="h-8 w-8" />}
            title="Student-Focused Listings"
            description="Tailored for UWaterloo students with locations and amenities that matter to you."
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Quick Communication"
            description="Direct messaging system to connect with potential subletters or subleasers."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Verified Listings"
            description="All listings are verified and posted by UWaterloo students only."
          />
        </div>
      </section>

      {/* Featured Listings Preview */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Subleases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ListingCard
              image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Modern Studio near UW Campus"
              location="200 University Ave W"
              price={800}
              term="Spring 2024"
            />
            <ListingCard
              image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Shared Apartment in Icon"
              location="Icon Waterloo"
              price={750}
              term="Summer 2024"
            />
            <ListingCard
              image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Private Room in Student Housing"
              location="Phillip Street"
              price={600}
              term="Fall 2024"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SubletConnect</h3>
              <p className="text-gray-400">Simplifying subleases for UWaterloo students.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Find a Sublease</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">List Your Space</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Safety Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SubletConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="inline-block p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface ListingCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  term: string;
}

function ListingCard({ image, title, location, price, term }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">${price}/month</span>
          <span className="text-gray-500">{term}</span>
        </div>
      </div>
    </div>
  );
}

export default App;