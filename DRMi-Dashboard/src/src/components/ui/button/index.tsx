// src/components/ui/button/index.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variantClasses = variant === 'primary'
    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
    : 'bg-gray-300 text-gray-700 hover:bg-gray-400';
  return (
    <button className={\`\${baseClasses} \${variantClasses}\`} {...props}>
      {children}
    </button>
  );
};

export default Button;
