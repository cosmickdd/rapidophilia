import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  height?: 'full' | 'tall' | 'medium' | 'small';
  overlay?: boolean;
  className?: string;
  compactMobile?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  height = 'full',
  overlay = true,
  className = '',
  compactMobile = true,
}) => {
  const heightClasses = {
    full: 'h-screen',
    tall: 'h-[80vh]',
    medium: 'h-[60vh]',
    small: 'h-[40vh]',
  };

  return (
    <section
      className={`hero-root relative ${heightClasses[height]} flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mobile-only helper CSS: hide possible external badge overlays that use this class */}
      <style>{`
        @media (max-width: 640px) {
          .hero-root .hero-external-badge { display: none !important; }
        }
      `}</style>
      {/* Background Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}

      {/* Background Gradient */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-purple-200 text-sm sm:text-lg mb-2 sm:mb-4 font-medium"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-3 sm:mb-6 ${compactMobile ? 'sm:leading-tight leading-snug line-clamp-2' : ''}`}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl sm:max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`flex items-center justify-center gap-3 ${compactMobile ? 'flex-col sm:flex-row' : ''}`}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Animated Elements */}
      {/* hide scroll indicator on small screens for cleaner mobile UX */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;