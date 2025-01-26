import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostListing = ({ onAddListing }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !location || !rent || !duration || !image) {
      alert('Please fill out all required fields!');
      return;
    }

    const newListing = {
      id: Date.now(),
      title,
      location,
      rent,
      duration,
      image,
      details, // Optional landlord comments or contact info
    };

    onAddListing(newListing);
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter listing title"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Rent</label>
          <input
            type="text"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter rent price (e.g., $1200/month)"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter duration (e.g., 6 months)"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Additional Comments/Contact Info</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Add any extra information, e.g., contact details, special instructions, etc."
            rows="4"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Listing
        </button>
      </form>
    </div>
  );
};

export default PostListing;
