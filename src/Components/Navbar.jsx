import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-green-600 text-2xl font-bold">
                CropPilot
              </span>
              <span className="ml-2 text-green-500 text-xl hidden sm:inline">
                | Smart Farming
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/recommendation"
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors duration-300"
            >
              Crop Recommendation
            </Link>
            <Link
              to="/priceprediction"
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors duration-300"
            >
              Price Prediction
            </Link>
            <Link
              to="/livepriceprediction"
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors duration-300"
            >
              Live Prices
            </Link>
            <Link
              to="/aboutus"
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-colors duration-300"
            >
              About Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <Link
            to="/recommendation"
            className="block px-3 py-3 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Crop Recommendation
          </Link>
          <Link
            to="/priceprediction"
            className="block px-3 py-3 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Price Prediction
          </Link>
          <Link
            to="/livepriceprediction"
            className="block px-3 py-3 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Live Prices
          </Link>
          <Link
            to="/aboutus"
            className="block px-3 py-3 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;