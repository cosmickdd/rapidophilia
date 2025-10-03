import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PriceOfferTimer } from '../common';

interface MinimalNavbarProps {
  onBookNowClick: () => void;
}

const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ onBookNowClick }) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 20h-13L12 6.5z"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Rapidophilia
            </span>
          </Link>

          {/* Timer and Book Now */}
          <div className="flex items-center space-x-4">
            {/* Compact Timer */}
            <div className="hidden sm:block">
              <PriceOfferTimer compact />
            </div>
            
            {/* Book Now Button */}
            <motion.button
              onClick={onBookNowClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Book Now
            </motion.button>
          </div>
        </div>

        {/* Mobile Timer - Centered */}
        <div className="sm:hidden pb-3 pt-1">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-2 max-w-fit">
              <PriceOfferTimer compact />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default MinimalNavbar;