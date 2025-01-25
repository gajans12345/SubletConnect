function Signup() {
    return (
        <div className="sign-container">
            <form className="sign-form">
                <h2>Login</h2>
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
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Log;
