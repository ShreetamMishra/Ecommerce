import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './Signup.css'; // Custom styles for Signup component
import Navbar from './Navbar';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const baseURL = 'http://localhost:8080/';
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      swal({
        text: "Error! Passwords are not matching",
        icon: "error",
        closeOnClickOutside: false,
      });
      return;
    }

    const user = {
      email,
      firstName,
      lastName,
      password,
    };

    try {
      await axios.post(`${baseURL}user/signup`, user);
      swal({
        text: "User signup successful. Please Login",
        icon: "success",
        closeOnClickOutside: false,
      });
      navigate('/signin');
    } catch (err) {
      console.error(err);
      swal({
        text: "Error! Signup failed",
        icon: "error",
        closeOnClickOutside: false,
      });
    }
  };

  return (
    <>
    <Navbar />
    <div className="signup-container">
      <div className="form-container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Create Account</h2>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  id="passwordConfirm"
                  type="password"
                  className="form-control"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </form>
            <hr />
            <p className="text-center">
              Already have an account?{' '}
              <button
                className="btn btn-link"
                onClick={() => navigate('/signin')}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
