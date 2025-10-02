import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PriceOfferTimerProps {
  endTime: Date;
  originalPrice: number;
  discountedPrice: number;
  className?: string;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

const PriceOfferTimer: React.FC<PriceOfferTimerProps> = ({
  endTime,
  originalPrice,
  discountedPrice,
  className = ''
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = endTime.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  const savings = originalPrice - discountedPrice;

  if (isExpired) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl ${className}`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 via-orange-50/40 to-amber-50/60" />
      
      <div className="relative z-10 p-6">
        {/* Enhanced Header */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl opacity-20 blur-md"
                />
              </motion.div>
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-black text-gray-900 tracking-tight"
                >
                  Limited Time Offer
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm font-medium text-gray-600"
                >
                  Exclusive pricing expires in:
                </motion.p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-lg">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-100">🔥</span>
                  <span>{discountPercentage}% OFF</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl opacity-30 blur-sm"
              />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Countdown Display */}
        <div className="relative mb-6">
          <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 rounded-3xl p-6 border border-gray-200/50 shadow-inner">
            <div className="flex items-center justify-center space-x-3 md:space-x-4">
              {/* Hours */}
              <div className="text-center">
                <motion.div
                  key={timeRemaining.hours}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/80 min-w-[70px] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-3xl font-black text-gray-900 tabular-nums">
                      {timeRemaining.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-1">
                      Hours
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-2xl blur-sm opacity-50"
                  />
                </motion.div>
              </div>

              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-gray-600 text-2xl font-black pb-8"
              >
                :
              </motion.div>

              {/* Minutes */}
              <div className="text-center">
                <motion.div
                  key={timeRemaining.minutes}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/80 min-w-[70px] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-3xl font-black text-gray-900 tabular-nums">
                      {timeRemaining.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-1">
                      Minutes
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute -inset-1 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-2xl blur-sm opacity-50"
                  />
                </motion.div>
              </div>

              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-gray-600 text-2xl font-black pb-8"
              >
                :
              </motion.div>

              {/* Seconds */}
              <div className="text-center">
                <motion.div
                  key={timeRemaining.seconds}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/80 min-w-[70px] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-3xl font-black text-gray-900 tabular-nums">
                      {timeRemaining.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-1">
                      Seconds
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute -inset-1 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-2xl blur-sm opacity-50"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Price Comparison */}
        <div className="relative mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200/60 rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative text-xl text-gray-400 line-through font-medium"
                  >
                    ₹{originalPrice.toLocaleString()}
                    <div className="absolute inset-0 bg-red-500/20 rounded transform rotate-12 blur-sm"></div>
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-3xl font-black text-gray-900"
                  >
                    ₹{discountedPrice.toLocaleString()}
                  </motion.span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-emerald-700 font-bold">
                    You save ₹{savings.toLocaleString()}
                  </p>
                  <span className="text-green-600 text-lg">💰</span>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="text-right space-y-2"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg">
                    <div className="flex items-center space-x-1">
                      <span>✨</span>
                      <span>Best Price</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-emerald-400/30 rounded-2xl blur-md"
                  />
                </motion.div>
                <p className="text-xs text-gray-600 font-medium">Guaranteed Lowest</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center justify-center space-x-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <p className="text-sm text-gray-700 font-medium">
                This exclusive price expires when the timer reaches zero
              </p>
              <span className="text-orange-500">⏰</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriceOfferTimer;
