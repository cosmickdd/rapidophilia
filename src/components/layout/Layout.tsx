import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest element with js-book-now class
      const btn = target.closest ? target.closest('.js-book-now') as HTMLElement : null;
      if (btn) {
        e.preventDefault();
        const el = document.getElementById('tabpanel-booking');
        if (el) {
          // Determine header height dynamically if present
          const header = document.getElementById('site-navbar') || document.getElementById('site-navbar-min');
          const headerHeight = header ? (header as HTMLElement).clientHeight : 80;
          const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12; // extra spacing
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        // notify any listeners
        window.dispatchEvent(new CustomEvent('openBookingTab'));
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 pt-16 lg:pt-20 ${className}`}
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Layout;