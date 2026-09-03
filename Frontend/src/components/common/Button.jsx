import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'right'
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-none tracking-wide select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs uppercase tracking-wider px-4 py-2 gap-2',
    md: 'text-sm uppercase tracking-wider px-6 py-3 gap-2.5',
    lg: 'text-base uppercase tracking-wider px-8 py-4 gap-3'
  }[size];

  const variantStyles = {
    primary:
      'bg-[#c5a880] text-[#0f0f11] font-semibold hover:bg-[#d4b58b] shadow-lg shadow-[#c5a880]/15 hover:shadow-[#c5a880]/25 active:bg-[#b39366]',
    secondary:
      'bg-[#1a1a1f] text-white border border-white/10 hover:border-[#c5a880]/50 hover:bg-[#24242c]',
    outline:
      'bg-transparent text-[#e8e6e1] border border-white/20 hover:border-white hover:text-white',
    goldOutline:
      'bg-transparent text-[#c5a880] border border-[#c5a880]/40 hover:border-[#c5a880] hover:bg-[#c5a880]/10',
    text: 'bg-transparent text-[#c5a880] hover:text-[#d4b58b] p-0 underline-offset-4 hover:underline'
  }[variant];

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </>
  );

  const combinedClasses = `group ${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} className="inline-block">
        <Link to={to} className={combinedClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} className="inline-block">
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      className={combinedClasses}
    >
      {content}
    </motion.button>
  );
};

export default Button;
