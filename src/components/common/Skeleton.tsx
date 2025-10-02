import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'card' | 'avatar';
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text',
  lines = 1 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    image: 'h-48 w-full',
    card: 'h-64 w-full',
    avatar: 'h-12 w-12 rounded-full'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`${baseClasses} ${variants.text} ${i === lines - 1 ? 'w-3/4' : ''}`} 
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <Skeleton variant="image" />
    <div className="p-6 space-y-4">
      <Skeleton variant="text" />
      <Skeleton variant="text" lines={2} />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);