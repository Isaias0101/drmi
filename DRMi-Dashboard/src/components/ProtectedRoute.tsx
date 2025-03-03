// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../lib/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode; // Permite cualquier elemento React como hijo
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra los hijos
  return <>{children}</>;
};

export default ProtectedRoute;
