import { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User } from 'lucide-react';

function Sign({ setIsLoggedIn, setShowSignup }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const checkValidPassword = () => {
    if (!password) return;

    const errors = [];
    if (password.length < 8) {
      errors.push("be at least 8 characters long");
    }
    if (!/\d/.test(password)) {
      errors.push("contain at least one number");
    }

    if (errors.length > 0) {
      alert("Password must:\n- " + errors.join("\n- "));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password checks
    checkValidPassword();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        console.log('Signup successful, updating UI...');
        setShowSignup(false);
        setIsLoggedIn(true);
        
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <User className="h-5 w-5 text-gray-400 ml-2" />
          <input
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent px-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <Lock className="h-5 w-5 text-gray-400 ml-2" />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={handleConfirmPassword}
            className="flex-1 bg-transparent px-2 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Sign;