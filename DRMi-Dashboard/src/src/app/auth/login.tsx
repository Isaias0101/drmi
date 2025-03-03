import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../lib/hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState('isc141477');
  const [password, setPassword] = useState('Atlixco33!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Start animations when component mounts
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (matricula === 'isc141477' && password === 'Atlixco33!') {
        login('dummy-token');
        navigate('/dashboard');
      } else {
        setError('Matrícula o contraseña incorrecta.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-100 opacity-20"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-green-50 opacity-20"></div>
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-green-100 opacity-25"></div>
        
        {/* Animated wave patterns */}
        <div 
          className="absolute bottom-0 w-full h-16 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-10"
          style={{
            clipPath: 'polygon(0% 0%, 4% 12%, 8% 25%, 13% 37%, 17% 50%, 21% 62%, 25% 75%, 29% 87%, 33% 100%, 38% 87%, 42% 75%, 46% 62%, 50% 50%, 54% 37%, 58% 25%, 63% 12%, 67% 0%, 71% 12%, 75% 25%, 79% 37%, 83% 50%, 88% 62%, 92% 75%, 96% 87%, 100% 100%, 100% 100%, 0% 100%)',
            animation: 'wave 25s linear infinite',
          }}
        ></div>
        <div 
          className="absolute bottom-0 w-full h-12 bg-gradient-to-r from-teal-500 to-green-400 opacity-10"
          style={{
            clipPath: 'polygon(0% 100%, 4% 87%, 8% 75%, 13% 62%, 17% 50%, 21% 37%, 25% 25%, 29% 12%, 33% 0%, 38% 12%, 42% 25%, 46% 37%, 50% 50%, 54% 62%, 58% 75%, 63% 87%, 67% 100%, 71% 87%, 75% 75%, 79% 62%, 83% 50%, 88% 37%, 92% 25%, 96% 12%, 100% 0%, 100% 100%, 0% 100%)',
            animation: 'wave 20s linear infinite reverse',
          }}
        ></div>
      </div>

      {/* Login Container */}
      <div 
        className={`relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-100 transition-all duration-700 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Bienvenido</h2>
          <p className="text-gray-500">Plataforma Educativa</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded animate-pulse">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className={`transition-all duration-500 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700 mb-1">
              Matrícula
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="matricula"
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="pl-10 block w-full border border-gray-300 rounded-md py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ingresa tu matrícula"
                required
              />
            </div>
          </div>

          <div 
            className={`transition-all duration-500 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full border border-gray-300 rounded-md py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          <div 
            className={`transition-all duration-500 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-500 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform transition hover:scale-105 disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div 
          className={`mt-8 text-center text-sm text-gray-500 transition-all duration-500 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <p>¿No tienes una cuenta?{' '}
            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
              Regístrate
            </a>
          </p>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;