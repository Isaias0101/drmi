// src/components/layouts/DashboardLayout/index.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Gamepad2,
  Rocket,
  Trophy,
  Star,
  Brain,
  Zap,
  Crown,
  Clock,
  Bell,
  Book,
  ChevronRight,
  Medal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Sidebar */}
      <aside className="w-72 bg-white/90 backdrop-blur-lg shadow-lg">
        <div className="p-6 bg-gradient-to-r from-violet-700 to-indigo-700 rounded-b-2xl">
          <div className="flex items-center space-x-3">
            <Gamepad2 size={32} className="text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">DRMi</h1>
              <p className="text-indigo-200 text-sm">¡Tu aventura de aprendizaje!</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gradient-to-r from-purple-200 to-indigo-200 rounded-2xl p-4 shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl transform hover:scale-105 transition-transform duration-200">
                <Trophy size={32} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Nivel 24</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 w-2/3"></div>
                </div>
                <p className="text-sm text-indigo-600 mt-1">¡A 100XP del siguiente nivel!</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { icon: Rocket, text: 'Misiones', badge: '3', color: 'from-pink-500 to-rose-500' },
            { icon: Brain, text: 'Clases', color: 'from-purple-500 to-indigo-500' },
            { icon: Star, text: 'Logros', badge: 'NEW', color: 'from-yellow-500 to-amber-500' },
            { icon: Zap, text: 'Desafíos', color: 'from-blue-500 to-cyan-500' },
            { icon: Crown, text: 'Ranking', color: 'from-emerald-500 to-teal-500' },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${item.color} transform group-hover:scale-110 transition-all duration-200`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <span className="font-medium text-gray-700">{item.text}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.badge === 'NEW' ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-md shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-indigo-100 px-4 py-2 rounded-full">
              <Clock size={20} className="text-indigo-600" />
              <span className="font-medium text-indigo-600">Racha: 7 días 🔥</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white">
                <Trophy size={20} />
              </div>
              <span className="font-medium text-gray-800">2,450 XP</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-gray-800">¡Hola Aventurero! 🚀</h1>
              <p className="mt-2 text-lg text-gray-600">Nueva misión: Completa 3 desafíos hoy</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Próxima Misión</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-violet-100 to-indigo-100 p-4 rounded-xl">
                    <div className="p-3 bg-white rounded-xl shadow">
                      <Book size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Quiz de Historia</p>
                      <p className="text-sm text-gray-600">+100 XP</p>
                    </div>
                    <ChevronRight className="ml-auto text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Logros Recientes</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Medal, title: 'Quiz Master', color: 'from-yellow-500 to-amber-500' },
                    { icon: Brain, title: 'Genio Mate', color: 'from-blue-500 to-cyan-500' },
                    { icon: Sparkles, title: 'Creativo', color: 'from-pink-500 to-rose-500' },
                    { icon: CheckCircle2, title: 'Constante', color: 'from-green-500 to-emerald-500' },
                  ].map((achievement, i) => (
                    <div key={i} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1">
                      <div className={\`w-12 h-12 mb-2 bg-gradient-to-r \${achievement.color} rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-200\`}>
                        <achievement.icon size={24} className="text-white" />
                      </div>
                      <p className="font-medium text-gray-700">{achievement.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu Progreso</h2>
                <div className="space-y-6">
                  {[
                    { subject: 'Historia', progress: 75, color: 'from-violet-500 to-indigo-500' },
                    { subject: 'Matemáticas', progress: 60, color: 'from-pink-500 to-rose-500' },
                    { subject: 'Ciencias', progress: 85, color: 'from-blue-500 to-cyan-500' },
                  ].map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-700">{subject.subject}</span>
                        <span className="text-gray-600">{subject.progress}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={\`h-full bg-gradient-to-r \${subject.color} transition-all duration-500\`}
                          style={{ width: \`\${subject.progress}%\` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
