// Import necessary hooks and libraries
import { useState } from 'react';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';

function Logg({ setIsLoggedIn, setShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/login/${email}`);

      if (response.data.password === password) {
        // First hide the login form
        setShowLogin(false);
        // Then update the logged in state
        setIsLoggedIn(true);
        
        // Clear the form
        setEmail('');
        setPassword('');
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert('User not found');
      } else {
        alert('An error occurred during login');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <Mail className="h-5 w-5 text-gray-400 ml-2" />
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <Lock className="h-5 w-5 text-gray-400 ml-2" />
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent px-2 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Logg;