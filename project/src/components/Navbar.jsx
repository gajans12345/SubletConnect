import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import Logg from '../Logg';
import Sign from '../Sign';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            {isLoggedIn && (
              <Link to="/post" className="text-gray-600 hover:text-blue-600">
                Post Listing
              </Link>
            )}
            {!isLoggedIn ? (
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setShowLogin(!showLogin);
                    if (!showLogin) setShowSignup(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setShowSignup(!showSignup);
                    if (!showSignup) setShowLogin(false);
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login/Signup Forms */}
      {showLogin && !showSignup && <Logg setIsLoggedIn={setIsLoggedIn} />}
      {showSignup && !showLogin && <Sign />}
    </nav>
  );
};

export default Navbar;
