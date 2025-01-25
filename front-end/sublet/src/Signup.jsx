import { useState } from 'react';
function Signup() {
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    const handleConfirmPassword = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
    };

    const checkPasswords = () => {
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
        }
    };

    return (
        <div className="sign-container">
            <form className="sign-form">
                <h2>Signup</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        required
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
                        onBlur={checkPasswords}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
