import React from 'react';

const Signin = ({ setUserEmail, setIsLoggedIn }) => {
  const handleSignin = () => {
    const email = prompt("Enter your email (use admin@gmail.com for admin role):");
    if (email) {
      setUserEmail(email);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="container">
      <h2>Signin Page</h2>
      <button onClick={handleSignin}>Sign In</button>
    </div>
  );
};

export default Signin;
