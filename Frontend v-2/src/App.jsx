import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import Home from './Home'; // Import Home

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Pass the necessary states as props to Home */}
        <Route 
          path="/" 
          element={<Home 
            userEmail={userEmail} 
            isLoggedIn={isLoggedIn} 
            setUserEmail={setUserEmail} 
            setIsLoggedIn={setIsLoggedIn} 
          />} 
        />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/signin" 
          element={<Signin setUserEmail={setUserEmail} setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/dashboard" 
          element={isLoggedIn && userEmail === "admin@gmail.com" 
            ? <Dashboard /> 
            : <Signin setUserEmail={setUserEmail} setIsLoggedIn={setIsLoggedIn} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
