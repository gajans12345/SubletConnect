import { useState } from 'react';
import Log from './Log';
import Signup from './Signup';
function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div>
            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'Close Login' : 'Login'}
            </button>

            <button onClick={() => setShowSignup(!showSignup)}>
                {showSignup ? 'Close Signup' : 'Signup'}
            </button>
            
            {showLogin && <Log />}

            {showSignup && <Signup />}
            
            {/* Your other app content */}
        </div>
    );
}

export default App; 