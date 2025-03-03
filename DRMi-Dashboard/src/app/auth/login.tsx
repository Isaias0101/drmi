// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/login.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../lib/hooks/useAuth';

// Import fonts
import '@fontsource/poppins';
import '@fontsource/roboto';
import '@fontsource/fredoka-one';

// Material UI imports
import { Box, Container, CssBaseline, IconButton, Typography, Drawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { ThemeProvider } from '@mui/material/styles';

import { getTheme } from './ThemeConfig';
import Logo from './Logo';
import { BackgroundLight, BackgroundDark, BackgroundCyberpunk, BackgroundRGB } from './Backgrounds';
import LoginForm from './LoginForm';
import SettingsDrawer from './SettingsDrawer';
import { SoundManager } from './SoundManager';

// Opciones de tema y personalización
const fluoColors = [
  { name: "Azul", value: "#00BFFF" },
  { name: "Verde", value: "#00FF7F" },
  { name: "Morado", value: "#9D00FF" },
  { name: "Amarillo Cyberpunk", value: "#FFD700" },
  { name: "RGB Gamer", value: "rainbow" }
];

const fonts = [
  { name: "Poppins", value: 'Poppins, sans-serif' },
  { name: "Roboto", value: 'Roboto, sans-serif' },
  { name: "Fredoka One", value: '"Fredoka One", sans-serif' }
];

const avatarOptions = [
  { id: 1, color: "#FF9800", icon: "👧", sound: "human" },
  { id: 2, color: "#03A9F4", icon: "👦", sound: "human" },
  { id: 3, color: "#8BC34A", icon: "🐱", sound: "cat" },
  { id: 4, color: "#9C27B0", icon: "🐶", sound: "dog" },
  { id: 5, color: "#607D8B", icon: "🤖", sound: "robot" },
  { id: 6, color: "#4CAF50", icon: "🌳", sound: "nature" }
];

const difficultyLevels = [
  { id: "easy", label: "Fácil", color: "#8BC34A", icon: <></>, stars: 1 },
  { id: "medium", label: "Media", color: "#FF9800", icon: <></>, stars: 2 },
  { id: "hard", label: "Alta", color: "#F44336", icon: <></>, stars: 3 }
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const soundManagerRef = useRef<SoundManager | null>(null);
  const debounceTimerRef = useRef<any>(null);

  // Estados del formulario y personalización
  const [tabValue, setTabValue] = useState(0);
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [colorMode, setColorMode] = useState('system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [fluoColorIndex, setFluoColorIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isNightTime = currentTime.getHours() >= 19 || currentTime.getHours() < 7;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Determinar modo real (dark o light)
  let actualMode = 'light';
  if (
    colorMode === 'dark' ||
    (colorMode === 'system' && prefersDarkMode) ||
    (colorMode === 'auto' && isNightTime)
  ) {
    actualMode = 'dark';
  }

  // Color primario según el modo
  const primaryColor = actualMode === 'dark'
    ? (fluoColors[fluoColorIndex].value === 'rainbow' ? '#00BFFF' : fluoColors[fluoColorIndex].value)
    : "#00A176";

  const isRgbMode = actualMode === 'dark' && fluoColors[fluoColorIndex].value === 'rainbow';
  const theme = getTheme(actualMode as 'light' | 'dark', primaryColor, fonts[fontIndex].value);

  // Inicializar el gestor de sonidos
  useEffect(() => {
    soundManagerRef.current = new SoundManager();
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Actualizar la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Efecto de fade-in
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Agregar efecto de sonido en teclas
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const tagName = document.activeElement?.tagName.toLowerCase();
      if ((tagName === 'input' || tagName === 'textarea') && soundManagerRef.current && soundEnabled) {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          soundManagerRef.current?.playTypingSound(e.key);
        }, 5);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [soundEnabled]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    soundManagerRef.current?.playModeChangeSound();
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    soundManagerRef.current?.playTogglePasswordSound(!showPassword);
  };

  const toggleSound = () => {
    if (soundManagerRef.current) {
      const isMuted = soundManagerRef.current.toggleMute();
      setSoundEnabled(!isMuted);
    }
  };

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  const cycleColorMode = () => {
    setColorMode(prev => {
      const nextMode = { 'light': 'dark', 'dark': 'auto', 'auto': 'system', 'system': 'light' }[prev];
      soundManagerRef.current?.playModeChangeSound();
      return nextMode;
    });
  };

  const getModeIcon = () => {
    switch (colorMode) {
      case 'light': return <MenuIcon />;
      case 'dark': return <CloseIcon />;
      case 'auto': return <SettingsBrightnessIcon />;
      case 'system': return prefersDarkMode ? <CloseIcon /> : <MenuIcon />;
      default: return <SettingsBrightnessIcon />;
    }
  };

  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatar(avatarId);
    soundManagerRef.current?.playAvatarSound(avatarId);
  };

  const handleDifficultySelect = (difficultyId: string) => {
    setSelectedDifficulty(difficultyId);
    soundManagerRef.current?.playDifficultySound(difficultyId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: (value: string) => void) => {
    const input = e.target;
    setter(input.value);
    input.classList.add('typing-glow');
    setTimeout(() => input.classList.remove('typing-glow'), 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (tabValue === 1) {
      if (!selectedAvatar) {
        setError('Por favor selecciona un avatar');
        setLoading(false);
        soundManagerRef.current?.playErrorSound();
        return;
      }
      if (!selectedDifficulty) {
        setError('Por favor selecciona un nivel de dificultad');
        setLoading(false);
        soundManagerRef.current?.playErrorSound();
        return;
      }
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (matricula && password) {
        if (tabValue === 0) {
          login('dummy-token');
          soundManagerRef.current?.playSuccessSound();
          setTimeout(() => navigate('/dashboard'), 1000);
        } else {
          soundManagerRef.current?.playSuccessSound();
          setTimeout(() => {
            setTabValue(0);
            setMatricula('');
            setPassword('');
          }, 1000);
        }
      } else {
        setError('Por favor completa todos los campos');
        soundManagerRef.current?.playErrorSound();
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intente nuevamente.');
      soundManagerRef.current?.playErrorSound();
    } finally {
      setLoading(false);
    }
  };

  const modeLabel = (() => {
    if (colorMode === 'auto') return `${isNightTime ? 'Modo Noche' : 'Modo Día'} (Auto)`;
    if (colorMode === 'system') return prefersDarkMode ? 'Preferencia: Oscuro' : 'Preferencia: Claro';
    return colorMode === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
  })();

  // Agregar estilos globales, incluido un cursor personalizado (reemplaza la URL por la de tu cursor si lo deseas)
  const globalStyles = `
    body { cursor: url('your-cursor-url.png'), auto; }
    @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
    @keyframes blob1 { 0% { transform: translate(-50%, -50%) scale(1); } 33% { transform: translate(-30%, -60%) scale(1.2); } 66% { transform: translate(-60%, -40%) scale(0.8); } 100% { transform: translate(-50%, -50%) scale(1); } }
    @keyframes blob2 { 0% { transform: translate(-50%, -50%) scale(1); } 33% { transform: translate(-60%, -40%) scale(0.9); } 66% { transform: translate(-40%, -30%) scale(1.1); } 100% { transform: translate(-50%, -50%) scale(1); } }
    @keyframes rainbow { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
    @keyframes cyberpunkMove { 0% { transform: translate(0, 0); } 100% { transform: translate(-50px, -50px); } }
    @keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.1); opacity: 0.7; } }
    @keyframes ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
    @keyframes bounce { 0% { transform: translate(0, 0); } 50% { transform: translate(0, -20px); } 100% { transform: translate(0, 0); } }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .typing-glow { animation: glow 0.3s ease-in-out; }
    @keyframes glow { 0% { box-shadow: 0 0 0 0 rgba(0, 161, 118, 0.5); } 50% { box-shadow: 0 0 10px 4px rgba(0, 161, 118, 0.5); } 100% { box-shadow: 0 0 0 0 rgba(0, 161, 118, 0.5); } }
  `;

  // Generar círculos animados (bouncing circles)
  const circleCount = useMediaQuery('(max-width: 600px)') ? 6 : 12;
  const generateRandomCircles = (count: number, mode: string, primaryColor: string) => {
    const circles = [];
    for (let i = 0; i < count; i++) {
      const size = `${20 + Math.random() * 60}px`;
      const delay = Math.random() * 3;
      const duration = 2 + Math.random() * 4;
      const position = {
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`
      };
      let color;
      if (mode === 'dark') {
        if (isRgbMode) {
          const hue = Math.floor(Math.random() * 360);
          color = `hsla(${hue}, 80%, 60%, 0.3)`;
        } else {
          color = (window as any).muiTheme ? (window as any).muiTheme.palette.primary.main : primaryColor;
        }
      } else {
        const hue = 140 + Math.floor(Math.random() * 40);
        color = `hsla(${hue}, ${60 + Math.random() * 20}%, ${70 + Math.random() * 20}%, 0.2)`;
      }
      circles.push(
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: 0.6,
            animation: `bounce ${duration}s ease-in-out infinite ${delay}s`,
            top: position.top,
            left: position.left,
            zIndex: -1,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
        />
      );
    }
    return circles;
  };
  const bouncingCircles = generateRandomCircles(circleCount, actualMode, primaryColor);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{globalStyles}</style>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -5, overflow: 'hidden', pointerEvents: 'none' }}>
        {bouncingCircles}
      </Box>
      {actualMode === 'light' ? (
        <BackgroundLight />
      ) : isRgbMode ? (
        <BackgroundRGB />
      ) : fluoColors[fluoColorIndex].name === "Amarillo Cyberpunk" ? (
        <BackgroundCyberpunk primaryColor={primaryColor} />
      ) : (
        <BackgroundDark primaryColor={primaryColor} />
      )}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, bgcolor: actualMode === 'dark' ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <IconButton
          onClick={toggleDrawer}
          sx={{ position: 'absolute', left: 16, color: actualMode === 'dark' ? '#fff' : '#1E3A5F', transition: 'transform 0.3s ease', transform: drawerOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" sx={{ color: actualMode === 'dark' ? '#fff' : '#1E3A5F', fontWeight: 'bold' }}>
          DoReMi
        </Typography>
        <Box sx={{ position: 'absolute', right: 16 }}>
          <IconButton onClick={toggleSound} sx={{ color: actualMode === 'dark' ? '#fff' : '#1E3A5F' }}>
            {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Box>
      </Box>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <SettingsDrawer
          actualMode={actualMode}
          primaryColor={primaryColor}
          modeLabel={modeLabel}
          toggleDrawer={toggleDrawer}
          fluoColors={fluoColors}
          fluoColorIndex={fluoColorIndex}
          setFluoColorIndex={setFluoColorIndex}
          fonts={fonts}
          fontIndex={fontIndex}
          setFontIndex={setFontIndex}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />
      </Drawer>
      <Container maxWidth={false} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', minHeight: '100vh', pt: { xs: 8, sm: 9 }, pb: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50%', pr: 4, mb: 4 }}>
          <Box sx={{ animation: 'float 4s ease-in-out infinite', mb: 3 }}>
            <Logo isDarkMode={actualMode === 'dark'} primaryColor={primaryColor} size={120} />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: actualMode === 'dark' ? primaryColor : "#1E3A5F", textAlign: 'center', fontSize: { md: '2.5rem', lg: '3rem' }, mb: 2 }}>
            ¡Bienvenido a DoReMi!
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center', maxWidth: '90%', mb: 4 }}>
            La plataforma educativa donde aprender es divertido
          </Typography>
          <Box sx={{ width: '80%', height: '180px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SchoolIcon sx={{ fontSize: '120px', opacity: 0.6, color: actualMode === 'dark' ? primaryColor : '#00A176', animation: 'float 5s ease-in-out infinite' }} />
          </Box>
        </Box>
        <LoginForm
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          matricula={matricula}
          setMatricula={setMatricula}
          password={password}
          setPassword={setPassword}
          error={error}
          loading={loading}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={handleAvatarSelect}
          avatarOptions={avatarOptions}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={handleDifficultySelect}
          difficultyLevels={difficultyLevels}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          primaryColor={primaryColor}
          actualMode={actualMode}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
