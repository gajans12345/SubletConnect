// Import necessary hooks and libraries
import { useState } from 'react';
import axios from 'axios';

function Log({status}) {
    // State variables to store form input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        
        try {
            // Make GET request to backend with email parameter
            const response = await axios.get(`http://localhost:3000/login/${email}`);
            
            // Compare entered password with password from database
            if (response.data.password === password) {
                console.log('Login successful!');
                alert('Login successful!');
                status(true);
                // TODO: Add redirect or other success handling
            } else {
                alert('Invalid password');
            }

        } catch (error) {
            // Handle different types of errors
            if (error.response?.status === 404) {
                alert('User not found');
            } else {
                alert('An error occurred during login');
            }
        }
    };

    // JSX for the login form
    return (
        <div className="sign-container">
            <form className="sign-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                {/* Email input field */}
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                    />
                </div>

                {/* Password input field */}
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Update password state
                    />
                </div>

                {/* Submit button */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Log; 