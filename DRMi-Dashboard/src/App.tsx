// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './app/auth/login';
import DashboardPage from './app/dashboard/page';
import DashboardLayout from './components/layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          {/* Se pueden agregar rutas hijas aquí */}
        </Route>

        {/* Redirigir cualquier otra ruta al Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
