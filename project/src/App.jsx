import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Listings from './Listings';
import PostListing from './PostListing';
import ListingDetails from './ListingDetails';
import MyListings from './components/MyListings';
import Logg from './Logg';
import Sign from './Sign';

const API_URL = 'http://localhost:3001/api';

const App = () => {
  const [listings, setListings] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Test backend connection first
    testBackendConnection();
    fetchListings();
  }, []);

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch('http://localhost:3001/api/test');
      const data = await response.json();
      console.log('Backend test response:', data);
    } catch (error) {
      console.error('Backend connection failed:', error);
    }
  };

  const fetchListings = async () => {
    try {
      console.log('Fetching listings from:', `${API_URL}/listings`);
      const response = await fetch(`${API_URL}/listings`, {
        credentials: 'include'
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched listings data:', data);
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      // You might want to set an error state here
    }
  };

  const handleAddListing = async (newListing) => {
    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
        credentials: 'include' // Include cookies if using sessions
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create listing');
      }

      const savedListing = await response.json();
      setListings(prevListings => [...prevListings, savedListing]);
      return savedListing; // Return the saved listing for the PostListing component
    } catch (error) {
      console.error('Error adding listing:', error);
      throw error; // Rethrow to handle in the PostListing component
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUserEmail(data.user.email);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/check-auth', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserEmail(localStorage.getItem('userEmail'));
          setUserId(localStorage.getItem('userId'));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        setUserEmail(null);
        setUserId(null);
      }
    };

    // Check if we have stored credentials
    const storedEmail = localStorage.getItem('userEmail');
    const storedUserId = localStorage.getItem('userId');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedEmail && storedUserId && storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
      setUserId(storedUserId);
    }

    checkAuth();
  }, []);

  return (
    <Router>
      <Navbar 
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />
      <Routes>
        <Route path="/" element={<Listings listings={listings} />} />
        <Route 
          path="/post" 
          element={
            isLoggedIn ? 
              <PostListing userEmail={userEmail} /> : 
              <Navigate to="/login" />
          } 
        />
        <Route 
          path="/my-listings" 
          element={<MyListings userEmail={userEmail} userId={userId} />}
        />
        <Route path="/listing/:id" element={<ListingDetails listings={listings} />} />
      </Routes>
      
      {/* Login Modal */}
      {showLogin && !showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <Logg 
              setIsLoggedIn={setIsLoggedIn} 
              setShowLogin={setShowLogin}
              setUserEmail={setUserEmail}
              setUserId={setUserId}
            />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <Sign 
              setIsLoggedIn={setIsLoggedIn} 
              setShowSignup={setShowSignup}
              setUserEmail={setUserEmail}
              setUserId={setUserId}
            />
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
