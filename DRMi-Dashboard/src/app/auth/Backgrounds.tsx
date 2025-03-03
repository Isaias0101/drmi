// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/Backgrounds.tsx

import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const BackgroundLight: React.FC = () => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #ffffff, #f0f8ff)'
  }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.7
    }} />
  </Box>
);

interface BackgroundDarkProps {
  primaryColor: string;
}

export const BackgroundDark: React.FC<BackgroundDarkProps> = ({ primaryColor }) => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #121212, #1E1E1E)'
  }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.7
    }}>
      <Box sx={{
        position: 'absolute',
        width: { xs: '30vw', md: '15vw' },
        height: { xs: '30vw', md: '15vw' },
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${primaryColor}, ${alpha(primaryColor, 0.7)})`,
        filter: 'blur(10px)',
        opacity: 0.7,
        top: '70%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
        animation: 'blob1 25s infinite alternate'
      }} />
      <Box sx={{
        position: 'absolute',
        width: { xs: '35vw', md: '20vw' },
        height: { xs: '35vw', md: '20vw' },
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${primaryColor}, ${alpha(primaryColor, 0.7)})`,
        filter: 'blur(12px)',
        opacity: 0.6,
        top: '40%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        animation: 'blob2 30s infinite alternate'
      }} />
    </Box>
  </Box>
);

interface BackgroundCyberpunkProps {
  primaryColor: string;
}

export const BackgroundCyberpunk: React.FC<BackgroundCyberpunkProps> = ({ primaryColor }) => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #000000, #1a1a2e)'
  }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.7
    }}>
      <Box sx={{
        position: 'absolute',
        width: { xs: '30vw', md: '15vw' },
        height: { xs: '30vw', md: '15vw' },
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${primaryColor}, #ff6b00)`,
        filter: 'blur(10px)',
        opacity: 0.8,
        top: '70%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
        animation: 'blob1 25s infinite alternate'
      }} />
      <Box sx={{
        position: 'absolute',
        width: { xs: '35vw', md: '20vw' },
        height: { xs: '35vw', md: '20vw' },
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${primaryColor}, #ff6b00)`,
        filter: 'blur(12px)',
        opacity: 0.7,
        top: '40%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        animation: 'blob2 30s infinite alternate'
      }} />
      <Box sx={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 215, 0, 0.05) 25%, rgba(255, 215, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, 0.05) 75%, rgba(255, 215, 0, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 215, 0, 0.05) 25%, rgba(255, 215, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, 0.05) 75%, rgba(255, 215, 0, 0.05) 76%, transparent 77%, transparent)',
        backgroundSize: '40px 40px',
        top: '-50%',
        left: '-50%',
        animation: 'cyberpunkMove 120s linear infinite'
      }} />
    </Box>
  </Box>
);

export const BackgroundRGB: React.FC = () => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #000000, #121212)'
  }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.8
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8B00FF)',
        backgroundSize: '600% 600%',
        animation: 'rainbow 10s linear infinite',
        opacity: 0.3
      }} />
      <Box sx={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.03) 75%, rgba(255, 255, 255, 0.03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.03) 75%, rgba(255, 255, 255, 0.03) 76%, transparent 77%, transparent)',
        backgroundSize: '30px 30px',
        top: '-50%',
        left: '-50%',
        animation: 'cyberpunkMove 60s linear infinite'
      }} />
      <Box sx={{
        position: 'absolute',
        width: { xs: '150px', md: '200px' },
        height: { xs: '150px', md: '200px' },
        borderRadius: '50%',
        border: '2px solid rgba(255,0,0,0.3)',
        top: '30%',
        left: '20%',
        animation: 'pulse 2s ease-in-out infinite alternate'
      }} />
      <Box sx={{
        position: 'absolute',
        width: { xs: '120px', md: '180px' },
        height: { xs: '120px', md: '180px' },
        borderRadius: '50%',
        border: '2px solid rgba(0,255,0,0.3)',
        top: '60%',
        left: '70%',
        animation: 'pulse 3s ease-in-out infinite alternate-reverse'
      }} />
      <Box sx={{
        position: 'absolute',
        width: { xs: '180px', md: '250px' },
        height: { xs: '180px', md: '250px' },
        borderRadius: '50%',
        border: '2px solid rgba(0,0,255,0.3)',
        top: '40%',
        left: '60%',
        animation: 'pulse 4s ease-in-out infinite alternate'
      }} />
    </Box>
  </Box>
);
