import { useState } from 'react';
import Log from './Log';
import Signup from './Signup';
function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div>
            <button onClick={() => {
                setShowLogin(!showLogin);
                if (!showLogin) setShowSignup(false);
            }}>
                {showLogin ? 'Close Login' : 'Login'}
            </button>

            <button onClick={() => {
                setShowSignup(!showSignup);
                if (!showSignup) setShowLogin(false);
            }}>
                {showSignup ? 'Close Signup' : 'Signup'}
            </button>
            
            {showLogin && !showSignup && <Log />}

            {showSignup && !showLogin && <Signup />}
            
            {/* Your other app content */}
        </div>
    );
}

export default App; 