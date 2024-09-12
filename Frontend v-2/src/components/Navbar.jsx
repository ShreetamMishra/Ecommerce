import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logooo from "../assets/logooo.png";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import DarkMode from './DarkMode';

const Menu = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Top Rated", link: "/#services" },
  { id: 3, name: "Kids Wear", link: "/#" },
  { id: 4, name: "Mens Wear", link: "/#" },
  { id: 5, name: "Electronics", link: "/#" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/#" },
  { id: 2, name: "Best Selling", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];
const Navbar = ({ userEmail, isLoggedIn, setUserEmail, setIsLoggedIn }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
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
            {/* order button */}
            <button
              onClick={() => alert("Order feature is not yet available")}
              className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'
            >
              <span
                className='group-hover:block hidden transition-all duration-200'
              >Order</span>
              <FaShoppingCart className='text-xl text-white drop-shadow-sm cursor-pointer' />
            </button>
            {/* Drakmode */}
            <DarkMode />
          </div>
        </div>
      </div>
        {/* </div> */}
      {/* // </div> */}

      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {/* Menu rendering */}
          {Menu.map((data) => (
            <li key={data.id}>
              <a href={data.link} className="inline-block px-4 hover:text-primary duration-200">
                {data.name}
              </a>
            </li>
          ))}

          {/* Dropdown */}
          {/* Dashboard link */}
          {isLoggedIn && userEmail === "admin@gmail.com" && (
            <li>
              <button onClick={goToDashboard} className="inline-block px-4 hover:text-primary duration-200">
                Dashboard
              </button>
            </li>
          )}

          {/* Login/Signup/Logout */}
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
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
