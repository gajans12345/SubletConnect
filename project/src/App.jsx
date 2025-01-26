import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Listings from './Listings';
import PostListing from './PostListing';
import ListingDetails from './ListingDetails';

const App = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Cozy Studio Apartment',
      location: '123 Maple Street, Springfield',
      rent: '$1,200/month',
      duration: '6 months',
      image: 'https://via.placeholder.com/300x200?text=Cozy+Studio+Apartment',
    },
    {
      id: 2,
      title: 'Spacious 2-Bedroom Condo',
      location: '456 Oak Avenue, Metropolis',
      rent: '$2,000/month',
      duration: '1 year',
      image: 'https://via.placeholder.com/300x200?text=2-Bedroom+Condo',
    },
  ]);

  const handleAddListing = (newListing) => {
    setListings((prevListings) => [newListing, ...prevListings]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Listings listings={listings} />} />
        <Route
          path="/post"
          element={<PostListing onAddListing={handleAddListing} />}
        />
        <Route path="/listing/:id" element={<ListingDetails listings={listings} />} />
      </Routes>
    </Router>
  );
};

export default App;
