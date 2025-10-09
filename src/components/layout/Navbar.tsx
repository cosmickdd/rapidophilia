import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX
} from 'react-icons/fi';
import { TbMountain } from 'react-icons/tb';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // dropdown state removed; navbar is intentionally minimal
  // location removed; minimal navbar doesn't need route awareness

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep navigation minimal: only Home is allowed from the navbar
  // isActive helper removed; navbar intentionally minimal

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-lg shadow-xl border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`p-2 rounded-lg ${
                isScrolled
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg'
              }`}
            >
              {TbMountain({})}
            </motion.div>
            <span
              className={`font-display font-bold text-xl ${
                isScrolled ? 'text-gray-900' : 'text-gray-900'
              }`}
            >
              Rapidophilia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Desktop: show only Book Now button that links to /trek/2 */}
            <a
              href="/trek/2#booking-form"
              onClick={(e) => {
                e.preventDefault();
                // navigate to trek/2 with fragment targeting booking form
                window.location.href = '/trek/2#booking-form';
              }}
              className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg transition-all duration-200"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-md transition-all duration-200 ${
              isScrolled 
                ? 'text-gray-800 hover:text-purple-600 hover:bg-purple-50' 
                : 'text-gray-800 hover:text-purple-600 hover:bg-purple-50/20'
            }`}
          >
            {isOpen ? FiX({ size: 24 }) : FiMenu({ size: 24 })}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {/* Mobile menu: only Book Now (go to /trek/2) */}
                <div className="px-4 pt-4">
                  <a
                    href="/trek/2#booking-form"
                    className="btn-primary w-full text-center"
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => {
                        window.location.href = '/trek/2#booking-form';
                      }, 120);
                    }}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;