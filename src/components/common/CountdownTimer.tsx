import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  endDate: Date;
  variant?: 'subtle' | 'prominent' | 'urgent';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  reason?: string;
  onExpiry?: () => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  variant = 'subtle',
  size = 'md',
  showLabel = true,
  reason = 'Early Bird Pricing',
  onExpiry,
  className = ''
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = endDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        onExpiry?.();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const totalHours = Math.floor(difference / (1000 * 60 * 60));

      setTimeRemaining({ days, hours, minutes, seconds, totalHours });

      // Set urgency level based on time remaining
      if (totalHours <= 6) {
        setUrgencyLevel('high');
      } else if (totalHours <= 24) {
        setUrgencyLevel('medium');
      } else {
        setUrgencyLevel('low');
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [endDate, onExpiry]);

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-3',
          timeBox: 'px-2 py-1 min-w-[45px]',
          timeNumber: 'text-lg font-bold',
          timeLabel: 'text-xs',
          headerText: 'text-sm',
          spacing: 'space-x-1'
        };
      case 'lg':
        return {
          container: 'p-6',
          timeBox: 'px-4 py-3 min-w-[80px]',
          timeNumber: 'text-3xl font-black',
          timeLabel: 'text-sm',
          headerText: 'text-lg',
          spacing: 'space-x-4'
        };
      default: // 'md'
        return {
          container: 'p-4',
          timeBox: 'px-3 py-2 min-w-[65px]',
          timeNumber: 'text-2xl font-bold',
          timeLabel: 'text-xs',
          headerText: 'text-base',
          spacing: 'space-x-3'
        };
    }
  };

  const getVariantStyles = () => {
    const baseUrgency = urgencyLevel === 'high' ? 'urgent' : urgencyLevel === 'medium' ? 'prominent' : variant;
    
    switch (baseUrgency) {
      case 'urgent':
        return {
          container: 'bg-gradient-to-br from-red-50 via-orange-50 to-red-100 border-2 border-red-200 shadow-xl',
          timeBox: 'bg-white border border-red-200 shadow-md',
          text: 'text-red-800',
          number: 'text-red-900',
          label: 'text-red-600',
          indicator: 'bg-red-500',
          badge: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'prominent':
        return {
          container: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 shadow-xl',
          timeBox: 'bg-white border border-blue-200 shadow-md',
          text: 'text-blue-800',
          number: 'text-blue-900',
          label: 'text-blue-600',
          indicator: 'bg-blue-500',
          badge: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      default: // 'subtle'
        return {
          container: 'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border border-gray-200 shadow-lg',
          timeBox: 'bg-white border border-gray-200 shadow-sm',
          text: 'text-gray-800',
          number: 'text-gray-900',
          label: 'text-gray-600',
          indicator: 'bg-gray-500',
          badge: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  if (isExpired) {
    return null;
  }

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  // Determine which time units to show
  const showDays = timeRemaining.days > 0;
  const showSeconds = size !== 'sm';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`rounded-2xl ${variantStyles.container} ${sizeStyles.container} ${className}`}
    >
      {/* Header */}
      {showLabel && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`w-3 h-3 rounded-full ${variantStyles.indicator} shadow-sm`}
            />
            <h4 className={`${sizeStyles.headerText} font-semibold ${variantStyles.text}`}>
              {reason}
            </h4>
          </div>
          {urgencyLevel === 'high' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`px-3 py-1 rounded-full text-xs font-bold border ${variantStyles.badge}`}
            >
              Ending Soon!
            </motion.div>
          )}
        </div>
      )}

      {/* Countdown Display */}
      <div className={`flex items-center justify-center ${sizeStyles.spacing}`}>
        {showDays && (
          <>
            <div className="text-center">
              <motion.div
                key={timeRemaining.days}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`${variantStyles.timeBox} rounded-xl ${sizeStyles.timeBox} hover:shadow-lg transition-all duration-200`}
              >
                <div className={`${sizeStyles.timeNumber} ${variantStyles.number} tabular-nums`}>
                  {timeRemaining.days}
                </div>
                <div className={`${sizeStyles.timeLabel} ${variantStyles.label} font-medium uppercase tracking-wider`}>
                  Day{timeRemaining.days !== 1 ? 's' : ''}
                </div>
              </motion.div>
            </div>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`${variantStyles.text} text-xl font-bold`}
            >
              :
            </motion.div>
          </>
        )}

        {/* Hours */}
        <div className="text-center">
          <motion.div
            key={timeRemaining.hours}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`${variantStyles.timeBox} rounded-xl ${sizeStyles.timeBox} hover:shadow-lg transition-all duration-200`}
          >
            <div className={`${sizeStyles.timeNumber} ${variantStyles.number} tabular-nums`}>
              {timeRemaining.hours.toString().padStart(2, '0')}
            </div>
            <div className={`${sizeStyles.timeLabel} ${variantStyles.label} font-medium uppercase tracking-wider`}>
              Hours
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`${variantStyles.text} text-xl font-bold`}
        >
          :
        </motion.div>

        {/* Minutes */}
        <div className="text-center">
          <motion.div
            key={timeRemaining.minutes}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`${variantStyles.timeBox} rounded-xl ${sizeStyles.timeBox} hover:shadow-lg transition-all duration-200`}
          >
            <div className={`${sizeStyles.timeNumber} ${variantStyles.number} tabular-nums`}>
              {timeRemaining.minutes.toString().padStart(2, '0')}
            </div>
            <div className={`${sizeStyles.timeLabel} ${variantStyles.label} font-medium uppercase tracking-wider`}>
              Minutes
            </div>
          </motion.div>
        </div>

        {showSeconds && (
          <>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`${variantStyles.text} text-xl font-bold`}
            >
              :
            </motion.div>
            <div className="text-center">
              <motion.div
                key={timeRemaining.seconds}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`${variantStyles.timeBox} rounded-xl ${sizeStyles.timeBox} hover:shadow-lg transition-all duration-200`}
              >
                <div className={`${sizeStyles.timeNumber} ${variantStyles.number} tabular-nums`}>
                  {timeRemaining.seconds.toString().padStart(2, '0')}
                </div>
                <div className={`${sizeStyles.timeLabel} ${variantStyles.label} font-medium uppercase tracking-wider`}>
                  Seconds
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Footer message for urgent timers */}
      {urgencyLevel === 'high' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          <p className={`text-sm ${variantStyles.text} font-medium`}>
            ⏰ This offer expires very soon!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CountdownTimer;
