import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown 
} from 'react-icons/fi';
import { TbMountain } from 'react-icons/tb';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Trek', path: '/trek' },
    { name: 'Adventure', path: '/adventure' },
    { name: 'Explore', path: '/explore' },
    { name: 'Blog', path: '/blog' },
    {
      name: 'Policies',
      dropdown: [
        { name: 'Refund Policy', path: '/refund-policy' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Use', path: '/terms-of-use' },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

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
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-800 hover:text-purple-600 font-medium'
                          : 'text-gray-800 hover:text-purple-600 font-medium'
                      }`}
                    >
                      <span>{item.name}</span>
                      {FiChevronDown({
                        className: `transform transition-transform duration-200 ${
                          dropdownOpen === item.name ? 'rotate-180' : ''
                        }`
                      })}
                    </button>

                    <AnimatePresence>
                      {dropdownOpen === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                              onClick={() => setDropdownOpen(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                      isActive(item.path)
                        ? isScrolled
                          ? 'text-purple-600 font-semibold'
                          : 'text-purple-600 font-semibold'
                        : isScrolled
                        ? 'text-gray-800 hover:text-purple-600 font-medium'
                        : 'text-gray-800 hover:text-purple-600 font-medium'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-violet-600"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  // try smooth scroll first
                  const el = document.getElementById('booking');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    // fallback: navigate to trek page and dispatch event so page can scroll on mount
                    window.location.href = '/trek/2';
                  }
                  // notify other listeners
                  window.dispatchEvent(new CustomEvent('scroll-to-booking'));
                }}
                href="/trek"
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700' 
                    : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700'
                } flex items-center gap-2`}
              >
                <span className="">Book Now</span>
              </a>
            </motion.div>
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
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <span>{item.name}</span>
                          {FiChevronDown({
                            className: `transform transition-transform duration-200 ${
                              dropdownOpen === item.name ? 'rotate-180' : ''
                            }`
                          })}
                        </button>
                        <AnimatePresence>
                          {dropdownOpen === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setDropdownOpen(null);
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive(item.path)
                            ? 'text-purple-600 bg-purple-50'
                            : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4">
                  <Link
                    to="/trek"
                    className="btn-primary w-full text-center"
                    onClick={() => {
                      setIsOpen(false);
                      // ensure mobile users are taken directly to booking form on trek page
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('scroll-to-booking'));
                      }, 120);
                    }}
                  >
                    Book Now
                  </Link>
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