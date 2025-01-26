import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostListing = ({ userEmail }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Reduce quality to 0.7 (70% of original)
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            'image/jpeg',
            0.7
          );
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Creating listing with email:', userEmail); // Debug log
      
      if (!title || !location || !rent || !duration) {
        alert('Please fill out all required fields!');
        return;
      }

      let imageData = null;
      if (image) {
        const compressedImage = await compressImage(image);
        imageData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(compressedImage);
        });
      }

      const newListing = {
        title,
        location,
        rent,
        duration,
        image: imageData,
        details,
        userEmail,
      };

      const response = await fetch('http://localhost:3001/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newListing)
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      const savedListing = await response.json();
      navigate('/my-listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image file is too large. Please choose an image under 10MB.');
        e.target.value = ''; // Clear the input
        return;
      }
      setImage(file);
    }
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
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Posting...' : 'Post Listing'}
        </button>
      </form>
    </div>
  );
};

export default PostListing;
