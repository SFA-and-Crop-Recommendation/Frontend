// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex w-full items-center justify-center">
            <div className="flex justify-around">
              <h1 className="text-white text-2xl font-bold">HarvestPro</h1>
            </div>
            <div className="hidden w-10/12 md:flex">
              <div className="ml-10 flex items-center justify-end gap-8 w-full">
                <Link to='/' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Home
                </Link>
                <Link to='/recommendation' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Crop Recommandation
                </Link>
                <Link to='/priceprediction' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Crop Price Prediction
                </Link>
                <Link to='/livepriceprediction' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Live Crop Price
                </Link>
                <Link to='/aboutus' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  About Us
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link to='/' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Home
        </Link>
        <Link to='/recommendation' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Crop Recommandation
        </Link>
        <Link to='/priceprediction' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Crop Price Prediction
        </Link>
        <Link to='/livepriceprediction' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Live Crop Price
        </Link>
        <Link to='/aboutus' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          About Us
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
