import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatRupeesWithSymbol } from '../../utils/currency';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  price?: number;
  rating?: number;
  duration?: string;
  difficulty?: string;
  link?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'feature' | 'testimonial';
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  price,
  rating,
  duration,
  difficulty,
  link,
  buttonText = 'Learn More',
  onClick,
  className = '',
  variant = 'default',
  children,
}) => {
  const cardContent = (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card-hover bg-white rounded-xl shadow-lg overflow-hidden h-full ${className}`}
    >
      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {difficulty && (
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {difficulty}
              </span>
            </div>
          )}
          {rating && (
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        
        {description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        )}

        {/* Meta Information */}
        {(duration || price) && (
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            {duration && (
              <span className="flex items-center">
                📅 {duration}
              </span>
            )}
            {price && (
              <span className="text-lg font-semibold text-purple-600">
                {formatRupeesWithSymbol(price)}
              </span>
            )}
          </div>
        )}

        {children}

        {/* Action Button */}
        {(link || onClick) && (
          <div className="mt-4">
            {link ? (
              <Link
                to={link}
                className="btn-primary inline-block text-center w-full"
              >
                {buttonText}
              </Link>
            ) : (
              <button
                onClick={onClick}
                className="btn-primary w-full"
              >
                {buttonText}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (variant === 'feature') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className={`text-center ${className}`}
      >
        {image && (
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
              {image}
            </div>
          </div>
        )}
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
        {children}
      </motion.div>
    );
  }

  if (variant === 'testimonial') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className={`bg-white rounded-xl shadow-lg p-6 text-center ${className}`}
      >
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt={title}
              className="w-16 h-16 rounded-full mx-auto object-cover"
            />
          </div>
        )}
        <h3 className="font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 italic mb-4">"{description}"</p>
        )}
        {rating && (
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        )}
        {children}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;