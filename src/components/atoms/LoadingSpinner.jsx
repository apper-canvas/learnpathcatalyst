import React from 'react';

const LoadingSpinner = ({ className = 'w-12 h-12', color = 'border-primary', size = 'border-4' }) => {
  return (
    <div className={`
      ${className}
      ${size}
      ${color}
      border-t-transparent 
      rounded-full 
      animate-spin 
      mx-auto 
      mb-4
    `}></div>
  );
};

export default LoadingSpinner;