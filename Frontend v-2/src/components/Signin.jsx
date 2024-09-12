import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const Signin = ({ setUserEmail, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const Navigate= useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const user = {
      email,
      password,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/user/signin', user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email); // Store email in localStorage
      setUserEmail(email);
      setIsLoggedIn(true);
      alert("Login successfully");
      if(email === "admin@example.com"){
        Navigate("/dashboard");
      }
      else{
        Navigate("/");
      }
    } catch (err) {
      setError('Unable to log you in!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='bg-gray-100 min-h-screen'>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center mb-52 ">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D4ED8] focus:border-[#1D4ED8] sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D4ED8] focus:border-[#1D4ED8] sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          New to our site?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Create an account</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signin;
