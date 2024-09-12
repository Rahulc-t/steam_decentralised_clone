import React from 'react';
import logo from '../images/logo_steam.svg'; // Ensure this is your Steam logo

const Navbar = () => {
  return (
    <nav className="bg-[#1b2838] text-white px-4 py-2 flex items-center justify-between h-[120px]">
      {/* Left Side - Logo */}
      <div className="flex items-center ml-[10%]">
        <img src={logo} alt="Steam Logo" className="h-12 mr-6" />
      </div>

      {/* Center - Navigation Links */}
      <div className="flex space-x-8 justify-center items-center">
        <a href="#" className="hover:text-blue-500 hover:underline text-lg">STORE</a>
        <a href="#" className="hover:text-blue-500 hover:underline text-lg">COMMUNITY</a>
        <a href="#" className="hover:text-blue-500 hover:underline text-lg">ABOUT</a>
        <a href="#" className="hover:text-blue-500 hover:underline text-lg">SUPPORT</a>
      </div>

      {/* Right Side - Login and Language Options */}
      <div className="flex items-start space-x-2 mt-2">
        <a href="/login" className="hover:text-gray-300 text-sm">login</a>
        <span className="text-sm">|</span>
        <a href="#" className="hover:text-gray-300 text-sm">language</a>
      </div>
    </nav>
  );
};

export default Navbar;
