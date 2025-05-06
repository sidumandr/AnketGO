import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }[size];

  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <div className={`spinner-border ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 