// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/Logo.tsx

import React from 'react';

interface LogoProps {
  isDarkMode: boolean;
  primaryColor: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ isDarkMode, primaryColor, size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 10L30 90" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" strokeLinecap="round" />
    <path d="M70 10L70 90" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" strokeLinecap="round" />
    <circle cx="30" cy="30" r="8" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" />
    <circle cx="70" cy="50" r="8" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" />
    <circle cx="30" cy="70" r="8" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" />
  </svg>
);

export default Logo;
