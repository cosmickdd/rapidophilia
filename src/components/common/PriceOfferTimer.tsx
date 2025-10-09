import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PriceOfferTimerProps {
  originalPrice?: number;
  discountedPrice?: number;
  className?: string;
  compact?: boolean;
  onDismiss?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PriceOfferTimer: React.FC<PriceOfferTimerProps> = ({
  originalPrice,
  discountedPrice,
  className = '',
  compact = false,
  onDismiss
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  // Function to get next Thursday 12 PM
  const getNextThursdayDeadline = () => {
    const now = new Date();
    const nextThursday = new Date();
    
    // Get current day (0 = Sunday, 1 = Monday, ..., 4 = Thursday, 6 = Saturday)
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    
    // Calculate days until next Thursday
    let daysUntilThursday = (4 - currentDay + 7) % 7;
    
    // If today is Thursday and it's before 12 PM, deadline is today at 12 PM
    if (currentDay === 4 && currentHour < 12) {
      daysUntilThursday = 0;
    } 
    // If today is Thursday and it's after 12 PM, deadline is next Thursday
    else if (currentDay === 4 && currentHour >= 12) {
      daysUntilThursday = 7;
    }
    // If daysUntilThursday is 0 and it's not Thursday, it means we need next Thursday
    else if (daysUntilThursday === 0) {
      daysUntilThursday = 7;
    }
    
    nextThursday.setDate(now.getDate() + daysUntilThursday);
    nextThursday.setHours(12, 0, 0, 0); // Set to 12:00 PM
    
    return nextThursday;
  };

  // Format a readable string for the upcoming Thursday deadline (e.g. "Thu, Oct 9 · 12:00 PM")
  const formatDeadlineLabel = (date: Date) => {
    try {
      return date.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch (e) {
      // Fallback
      return date.toDateString() + ' 12:00 PM';
    }
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const deadline = getNextThursdayDeadline().getTime();
      const difference = deadline - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        // If expired, reset to next Thursday
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        // Auto-reset after a brief moment
        setTimeout(() => {
          const newDeadline = getNextThursdayDeadline();
          const newDifference = newDeadline.getTime() - new Date().getTime();
          
          if (newDifference > 0) {
            const days = Math.floor(newDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((newDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((newDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((newDifference % (1000 * 60)) / 1000);
            
            setTimeRemaining({ days, hours, minutes, seconds });
            setIsExpired(false);
          }
        }, 1000);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []); // No dependencies needed since we calculate deadline dynamically

  const savingsAmount = originalPrice && discountedPrice ? originalPrice - discountedPrice : 0;
  const savingsPercentage = originalPrice && discountedPrice ? Math.round((savingsAmount / originalPrice) * 100) : 0;

  if (isExpired) {
    return null;
  }

  // Enhanced compact mode for hero section
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm mx-auto"
      >
        {/* Main timer container */}
        <div className="bg-gradient-to-br from-white via-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 shadow-lg">
          {/* Header with urgency indicator */}
          <div className="flex items-center justify-center space-x-2 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              ⚡
            </motion.div>
            <h3 className="text-sm font-black text-gray-900 text-center">
              LIMITED TIME OFFER
            </h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
          </div>

          {/* Price comparison */}
          <div className="text-center mb-3">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span className="text-sm text-gray-500 line-through">₹{originalPrice?.toLocaleString()}</span>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                {savingsPercentage}% OFF
              </motion.span>
            </div>
            <div className="text-2xl font-black text-green-600">₹{discountedPrice?.toLocaleString()}</div>
            <div className="text-xs text-gray-600">per person</div>
          </div>

          {/* Countdown timer */}
          <div className="mb-3">
            <p className="text-xs font-bold text-center text-red-600 mb-2">Registration Ends In:</p>
            <div className="flex items-center justify-center space-x-1">
              {timeRemaining.days > 0 && (
                <>
                  <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold min-w-[30px] text-center">
                    {timeRemaining.days}d
                  </div>
                  <span className="text-red-600 font-bold">:</span>
                </>
              )}
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold min-w-[35px] text-center">
                {timeRemaining.hours.toString().padStart(2, '0')}h
              </div>
              <span className="text-red-600 font-bold">:</span>
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold min-w-[35px] text-center">
                {timeRemaining.minutes.toString().padStart(2, '0')}m
              </div>
            </div>
          </div>

          {/* Savings highlight */}
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-green-100 border border-green-300 rounded-lg p-2 text-center"
          >
            <p className="text-xs font-bold text-green-800">
              💰 Save ₹{savingsAmount.toLocaleString()} Today!
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${className}`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 via-orange-50/40 to-amber-50/60" />
      
      <div className="relative z-10 p-3 sm:p-4">
        {/* Enhanced Header */}
        <div className="relative mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
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
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm sm:text-xl">⚡</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl sm:rounded-2xl opacity-20 blur-md"
                />
              </motion.div>
              
              <div>
                <h3 className="text-xs sm:text-lg font-black text-gray-900 leading-tight">
                  Registration Deadline
                </h3>
                <p className="text-xs sm:text-sm font-bold text-orange-600 leading-tight">
                  {formatDeadlineLabel(getNextThursdayDeadline())}
                </p>
              </div>
            </div>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg"
            >
              {savingsPercentage}% OFF
            </motion.div>
          </div>
        </div>

        {/* Enhanced Countdown Display */}
        <div className="relative mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 rounded-xl sm:rounded-3xl p-2 sm:p-6 border border-gray-200/50 shadow-inner">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-3">
              {/* Days */}
              {timeRemaining.days > 0 && (
                <>
                  <div className="text-center">
                    <motion.div
                      key={timeRemaining.days}
                      initial={{ y: -15, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative group"
                    >
                      <div className="bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-lg border border-gray-200/80 min-w-[35px] sm:min-w-[60px] backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/30 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative text-sm sm:text-2xl font-black text-gray-900 tabular-nums">
                          {timeRemaining.days.toString().padStart(2, '0')}
                        </div>
                        <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-0.5 sm:mt-1">
                          D
                        </div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-1 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-lg sm:rounded-xl blur-sm opacity-50"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-gray-600 text-sm sm:text-xl font-black pb-2 sm:pb-6"
                  >
                    :
                  </motion.div>
                </>
              )}
              
              {/* Hours */}
              <div className="text-center">
                <motion.div
                  key={timeRemaining.hours}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-lg border border-gray-200/80 min-w-[35px] sm:min-w-[60px] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-sm sm:text-2xl font-black text-gray-900 tabular-nums">
                      {timeRemaining.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-0.5 sm:mt-1">
                      H
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-lg sm:rounded-xl blur-sm opacity-50"
                  />
                </motion.div>
              </div>

              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-gray-600 text-sm sm:text-xl font-black pb-2 sm:pb-6"
              >
                :
              </motion.div>

              {/* Minutes */}
              <div className="text-center">
                <motion.div
                  key={timeRemaining.minutes}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-lg border border-gray-200/80 min-w-[35px] sm:min-w-[60px] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-sm sm:text-2xl font-black text-gray-900 tabular-nums">
                      {timeRemaining.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-0.5 sm:mt-1">
                      M
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-lg sm:rounded-xl blur-sm opacity-50"
                  />
                </motion.div>
              </div>

              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-gray-600 text-sm sm:text-xl font-black pb-2 sm:pb-6"
              >
                :
              </motion.div>

              {/* Seconds */}
              <div className="text-center">
                <motion.div
                  key={timeRemaining.seconds}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-lg border border-gray-200/80 min-w-[35px] sm:min-w-[60px] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-sm sm:text-2xl font-black text-gray-900 tabular-nums">
                      {timeRemaining.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="relative text-xs font-bold text-gray-600 uppercase tracking-wider mt-0.5 sm:mt-1">
                      S
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-lg sm:rounded-xl blur-sm opacity-50"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Comparison - Mobile Responsive */}
        <div className="space-y-2 sm:space-y-4">
          {/* Original Price */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
              Regular Price:
            </span>
            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <span className="text-sm sm:text-xl font-bold text-gray-400 line-through">
                ₹{originalPrice?.toLocaleString() || '0'}
              </span>
              <div className="absolute inset-0 bg-red-500/20 transform -skew-x-12 rounded"></div>
            </motion.div>
          </div>

          {/* Special Price */}
          <div className="text-center">
            <div className="text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-wider mb-1">
              Special Price:
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <span className="text-xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text">
                ₹{discountedPrice?.toLocaleString() || '0'}
              </span>
            </motion.div>
          </div>

          {/* Savings Amount */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg sm:rounded-xl p-2 sm:p-4">
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs sm:text-sm">₹</span>
              </motion.div>
              <span className="text-xs sm:text-base font-bold text-green-800">
                You Save ₹{savingsAmount.toLocaleString()}!
              </span>
            </div>
          </div>

          {/* Hurry Message */}
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center"
          >
            <p className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wider">
              ⏰ Hurry! Offer expires soon
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceOfferTimer;