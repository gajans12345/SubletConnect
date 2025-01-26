import { useState } from 'react';
import Log from './Log';
import Signup from './Signup';
import Home from './components/main/Home';
// import Main from './components/main/Home';
function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showHome, setShowHome] = useState(false);

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

            {/* Home Button */}
            <button onClick={() => setShowHome(!showHome)}>
                {showHome ? 'Close Home' : 'Home'}
            </button>
            
            {showLogin && !showSignup && <Log />}

            {showSignup && <Signup />}
            
            {/* Your other app content */}
        </div>
    );
}

export default App; 
