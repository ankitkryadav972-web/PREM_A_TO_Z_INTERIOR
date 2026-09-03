import React from 'react';

export const Container = ({ children, className = '', size = 'default' }) => {
  const maxWidthClass = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-[1400px]',
    full: 'max-w-full'
  }[size] || 'max-w-7xl';

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
