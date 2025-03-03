// src/components/ui/card/index.tsx
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
