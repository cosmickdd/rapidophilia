import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MinimalNavbarProps {
  onBookNowClick: () => void;
}

const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200 transition-all duration-300"
    >
      {/* Solid white navbar - no glass overlay needed */}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Enhanced Logo and Brand */}
          <div className="flex items-center space-x-3 group">
            <motion.div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-600 to-purple-800 transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className={`w-5 h-5 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 20h-13L12 6.5z"/>
              </svg>
            </motion.div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              Rapidophilia
            </span>
          </div>

          {/* Enhanced Book Now Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button
              onClick={() => {
                // existing callback for legacy pages
                onBookNowClick();

                // smooth scroll to #booking if present
                const el = document.getElementById('booking');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                // dispatch an event so other pages can listen
                window.dispatchEvent(new CustomEvent('scroll-to-booking'));
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden px-4 sm:px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
            >
              <span className="relative z-10">Book Now</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile timer removed - will be positioned separately */}
      </div>
    </motion.nav>
  );
};

export default MinimalNavbar;