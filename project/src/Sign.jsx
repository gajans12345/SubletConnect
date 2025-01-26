import { useState } from 'react';
import axios from 'axios';
function Sign() {
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[email, setEmail] = useState("");

    const handleConfirmPassword = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
    };

    

    const checkValidPassword = () => {
        // Only validate if password field isn't empty
        if (!password) return;
        
        const errors = [];
        if(password.length < 8) {
            errors.push("be at least 8 characters long");
        }
        if(!/\d/.test(password)) {
            errors.push("contain at least one number");
        }
        
        if(errors.length > 0) {
            // Use a single alert with all errors
            alert("Password must:\n- " + errors.join("\n- "));
        }
    };

    const signupSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                email: email,
                password: password
            });
            
            if (response.status === 200) {
                alert('Signup successful!');
                // You might want to redirect to login page or dashboard here
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred during signup');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        checkValidPassword();
        // Check passwords first
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // Stop here if passwords don't match
        }
        
        // If passwords match, proceed with signup API call
        signupSubmit(); // API CALL
    };


    return (
        <div className="sign-container">
            <form className="sign-form" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        required
                        onChange={handleConfirmPassword}
                        
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Sign;
