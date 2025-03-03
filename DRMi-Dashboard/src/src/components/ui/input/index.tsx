// src/components/ui/input/index.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
      {...props}
    />
  );
};

export default Input;
