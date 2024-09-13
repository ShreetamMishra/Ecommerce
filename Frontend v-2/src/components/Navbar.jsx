import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logooo from "../assets/logooo.png";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import DarkMode from './DarkMode';

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/categor" },
  { id: 3, name: "Kids Wear", link: "/#" },
  { id: 4, name: "Mens Wear", link: "/#" },
  { id: 5, name: "Electronics", link: "/#" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    
    if (token && email) {
      setUserEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/'); // Redirect to home after logout
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const goToDashboard = () => {
    navigate("/product-list");
  };

  const goToCategory = () => {
    navigate("/category-list");
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={logooo} alt="Logo" className="w-10" />
              e-shop
            </a>
          </div>

          {/* Search bar and other elements */}
          <div className='flex justify-between items-center gap-4'>
            <div className='relative group hidden sm:block'>
              <input
                type="text"
                placeholder='Search...'
                className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-10 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800'
              />
              <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 transform -translate-y-1/2 right-3' />
            </div>
            {/* Order button */}
            <button
              onClick={() => alert("Order feature is not yet available")}
              className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'
            >
              <span className='group-hover:block hidden transition-all duration-200'>Order</span>
              <FaShoppingCart className='text-xl text-white drop-shadow-sm cursor-pointer' />
            </button>
            {/* Darkmode */}
            <DarkMode />
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {/* Admin specific menu */}
          {isLoggedIn && userEmail === "admin@example.com" ? (
            <>
              <li>
                <a href="/#" className="inline-block px-4 hover:text-primary duration-200">
                  Home
                </a>
              </li>
              <li>
                <button onClick={goToDashboard} className="inline-block px-4 hover:text-primary duration-200">
                  Products
                </button>
              </li>
              <li>
                <button onClick={goToCategory} className="inline-block px-4 hover:text-primary duration-200">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="px-4 py-2 hover:text-primary duration-200">
                  Signout
                </button>
              </li>
            </>
          ) : (
            // Normal user menu
            <>
              {Menu.map((data) => (
                <li key={data.id}>
                  <a href={data.link} className="inline-block px-4 hover:text-primary duration-200">
                    {data.name}
                  </a>
                </li>
              ))}
              {!isLoggedIn ? (
                <>
                  <li>
                    <button onClick={handleSignin} className="px-4 py-2 hover:text-primary duration-200">
                      Signin
                    </button>
                  </li>
                  <li>
                    <button onClick={handleSignup} className="inline-block px-4 hover:text-primary duration-200">
                      Signup
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout} className="px-4 py-2 hover:text-primary duration-200">
                    Signout
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
