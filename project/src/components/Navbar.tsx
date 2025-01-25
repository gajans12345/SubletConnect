import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SubletConnect</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/listings" className="text-gray-600 hover:text-blue-600">
              Browse
            </Link>
            <Link to="/post" className="text-gray-600 hover:text-blue-600">
              Post Listing
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;