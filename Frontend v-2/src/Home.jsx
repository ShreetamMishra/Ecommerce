import React from 'react';
import Navbar from './components/Navbar';  // Assuming Navbar is in ./components/
import Hero from './components/Hero';      // Assuming Hero is another component

const Home = ({ userEmail, isLoggedIn, setUserEmail, setIsLoggedIn }) => {
  return (
    <div>
      {/* Pass props to Navbar */}
      <Navbar 
        userEmail={userEmail} 
        isLoggedIn={isLoggedIn} 
        setUserEmail={setUserEmail} 
        setIsLoggedIn={setIsLoggedIn} 
      />
      <Hero />
    </div>
  );
};

export default Home;
