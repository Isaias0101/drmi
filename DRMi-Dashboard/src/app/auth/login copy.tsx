import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../lib/hooks/useAuth';

// Import fonts
import '@fontsource/poppins';
import '@fontsource/roboto';
import '@fontsource/fredoka-one';

// Material UI imports
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Tabs,
  Tab,
  Avatar,
  Grid,
  Alert,
  CircularProgress,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  CssBaseline,
  Chip
} from '@mui/material';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SchoolIcon from '@mui/icons-material/School';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

// Theme options
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

// Avatar options for personalization
const avatarOptions = [
  { id: 1, color: "#FF9800", icon: "👧", sound: "human" },
  { id: 2, color: "#03A9F4", icon: "👦", sound: "human" },
  { id: 3, color: "#8BC34A", icon: "🐱", sound: "cat" },
  { id: 4, color: "#9C27B0", icon: "🐶", sound: "dog" },
  { id: 5, color: "#607D8B", icon: "🤖", sound: "robot" },
  { id: 6, color: "#4CAF50", icon: "🌳", sound: "nature" }
];

// Difficulty levels
const difficultyLevels = [
  { id: "easy", label: "Fácil", color: "#8BC34A", icon: <StarIcon />, stars: 1 },
  { id: "medium", label: "Media", color: "#FF9800", icon: <StarHalfIcon />, stars: 2 },
  { id: "hard", label: "Alta", color: "#F44336", icon: <StarOutlineIcon />, stars: 3 }
];

// Sound Manager Class
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.muted = false;
    this.activeOscillators = new Set();
    
    this.initAudioContext = () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      return this.audioContext;
    };
    
    this.notes = {
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77
    };
    
    // Create buffers for custom sounds
    this.buffers = {};
  }
  
  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.audioContext) {
      this.activeOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) { /* Ignore errors */ }
      });
      this.activeOscillators.clear();
    }
    return this.muted;
  }
  
  playNote(frequency, type = 'sine', duration = 0.3, volume = 0.5) {
    if (this.muted) return null;
    
    try {
      const context = this.initAudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(volume, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.start();
      this.activeOscillators.add(oscillator);
      
      oscillator.stop(context.currentTime + duration);
      oscillator.onended = () => {
        this.activeOscillators.delete(oscillator);
        oscillator.disconnect();
        gainNode.disconnect();
      };
      
      return oscillator;
    } catch (e) {
      console.error("Error playing sound:", e);
      return null;
    }
  }
  
  playChord(notes, stagger = 80) {
    if (this.muted) return;
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playNote(note.frequency, note.type, note.duration, note.volume);
      }, index * stagger);
    });
  }
  
  // Play a melody - more complex than a chord
  playMelody(notes) {
    if (this.muted) return;
    
    let timeOffset = 0;
    
    notes.forEach(note => {
      setTimeout(() => {
        this.playNote(note.frequency, note.type, note.duration, note.volume);
      }, timeOffset);
      timeOffset += note.delay || 200;
    });
  }
  
  playTypingSound(char) {
    if (this.muted) return;
    
    const notes = [this.notes.C4, this.notes.E4, this.notes.G4, this.notes.B4, this.notes.D5];
    const charCode = char.charCodeAt(0);
    const noteIndex = charCode % notes.length;
    this.playNote(notes[noteIndex], 'sine', 0.08, 0.15);
  }
  
  playTogglePasswordSound(visible) {
    this.playNote(visible ? this.notes.F4 : this.notes.D4, 'sine', 0.15, 0.2);
  }
  
  playModeChangeSound() {
    this.playNote(this.notes.A4, 'sine', 0.2, 0.3);
  }
  
  playButtonHoverSound() {
    this.playNote(this.notes.E5, 'sine', 0.1, 0.1);
  }
  
  playButtonClickSound() {
    this.playNote(this.notes.G4, 'triangle', 0.2, 0.2);
  }
  
  playNotification() {
    this.playMelody([
      { frequency: this.notes.G4, type: 'sine', duration: 0.1, volume: 0.3 },
      { frequency: this.notes.C5, type: 'sine', duration: 0.2, volume: 0.3, delay: 150 }
    ]);
  }
  
  playSuccessSound() {
    this.playChord([
      { frequency: this.notes.C4, type: 'sine', duration: 0.4, volume: 0.3 },
      { frequency: this.notes.E4, type: 'sine', duration: 0.4, volume: 0.3 },
      { frequency: this.notes.G4, type: 'sine', duration: 0.6, volume: 0.3 }
    ]);
  }
  
  playErrorSound() {
    this.playChord([
      { frequency: this.notes.B4, type: 'sine', duration: 0.2, volume: 0.2 },
      { frequency: this.notes.F4, type: 'sine', duration: 0.3, volume: 0.2 }
    ], 60);
  }
  
  playAvatarSound(avatarId) {
    if (this.muted) return;
    
    const sounds = {
      // Human avatars
      1: { 
        melody: [
          { frequency: this.notes.C5, type: 'sine', duration: 0.2, volume: 0.3 },
          { frequency: this.notes.E5, type: 'sine', duration: 0.2, volume: 0.3, delay: 100 }
        ]
      },
      2: { 
        melody: [
          { frequency: this.notes.D5, type: 'sine', duration: 0.2, volume: 0.3 },
          { frequency: this.notes.F5, type: 'sine', duration: 0.2, volume: 0.3, delay: 100 }
        ]
      },
      // Cat avatar
      3: { 
        melody: [
          { frequency: this.notes.A5, type: 'triangle', duration: 0.1, volume: 0.2 },
          { frequency: this.notes.E5, type: 'triangle', duration: 0.2, volume: 0.2, delay: 80 }
        ]
      },
      // Dog avatar
      4: { 
        melody: [
          { frequency: this.notes.G3, type: 'square', duration: 0.1, volume: 0.3 },
          { frequency: this.notes.C4, type: 'square', duration: 0.15, volume: 0.3, delay: 150 }
        ]
      },
      // Robot avatar
      5: { 
        melody: [
          { frequency: this.notes.C4, type: 'sawtooth', duration: 0.1, volume: 0.2 },
          { frequency: this.notes.C5, type: 'square', duration: 0.15, volume: 0.2, delay: 100 },
          { frequency: this.notes.G4, type: 'square', duration: 0.1, volume: 0.2, delay: 80 }
        ]
      },
      // Tree/nature avatar
      6: { 
        melody: [
          { frequency: this.notes.E4, type: 'sine', duration: 0.3, volume: 0.2 },
          { frequency: this.notes.A4, type: 'sine', duration: 0.4, volume: 0.2, delay: 200 },
          { frequency: this.notes.C5, type: 'sine', duration: 0.2, volume: 0.15, delay: 150 }
        ]
      }
    };
    
    const sound = sounds[avatarId];
    if (sound && sound.melody) {
      this.playMelody(sound.melody);
    } else {
      // Fallback
      this.playNote(this.notes.C5, 'sine', 0.3, 0.3);
    }
  }
  
  playDifficultySound(difficultyId) {
    const sounds = {
      "easy": { frequency: this.notes.C4, type: 'sine', duration: 0.3, volume: 0.3 },
      "medium": { frequency: this.notes.E4, type: 'sine', duration: 0.3, volume: 0.3 },
      "hard": { frequency: this.notes.G4, type: 'sine', duration: 0.3, volume: 0.3 }
    };
    
    if (sounds[difficultyId]) {
      const sound = sounds[difficultyId];
      this.playNote(sound.frequency, sound.type, sound.duration, sound.volume);
    }
  }
  
  playPopSound() {
    if (this.muted) return;
    
    try {
      const context = this.initAudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, context.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      this.activeOscillators.add(oscillator);
      
      oscillator.start();
      oscillator.stop(context.currentTime + 0.1);
      oscillator.onended = () => {
        this.activeOscillators.delete(oscillator);
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (e) {
      console.error("Error playing pop sound:", e);
    }
  }
  
  playRocketSound() {
    if (this.muted) return;
    
    try {
      const context = this.initAudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 0.4);
      
      gainNode.gain.setValueAtTime(0.2, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      this.activeOscillators.add(oscillator);
      
      oscillator.start();
      oscillator.stop(context.currentTime + 0.4);
      oscillator.onended = () => {
        this.activeOscillators.delete(oscillator);
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (e) {
      console.error("Error playing rocket sound:", e);
    }
  }
  
  playBubbleSound() {
    if (this.muted) return;
    
    const freq = 450 + Math.random() * 350;
    
    try {
      const context = this.initAudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq * 1.5, context.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      this.activeOscillators.add(oscillator);
      
      oscillator.start();
      oscillator.stop(context.currentTime + 0.2);
      oscillator.onended = () => {
        this.activeOscillators.delete(oscillator);
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (e) {
      console.error("Error playing bubble sound:", e);
    }
  }
}

// Logo component
const Logo = ({ isDarkMode, primaryColor, size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 10L30 90" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" strokeLinecap="round" />
    <path d="M70 10L70 90" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" strokeLinecap="round" />
    <circle cx="30" cy="30" r="8" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" />
    <circle cx="70" cy="50" r="8" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" />
    <circle cx="30" cy="70" r="8" stroke={isDarkMode ? primaryColor : "#1E3A5F"} strokeWidth="6" />
  </svg>
);

// Background components
const BackgroundLight = () => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #ffffff, #f0f8ff)'
  }}>
    <Box className="light-effect" sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.7
    }}>
      <Box className="light-blob" sx={{
        position: 'absolute',
        width: { xs: '30vw', md: '15vw' },
        height: { xs: '30vw', md: '15vw' },
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #00A176, #006B4F)',
        filter: 'blur(10px)',
        opacity: 0.7,
        top: '70%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
        animation: 'blob1 25s infinite alternate'
      }} />
      <Box className="light-blob" sx={{
        position: 'absolute',
        width: { xs: '35vw', md: '20vw' },
        height: { xs: '35vw', md: '20vw' },
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #008E67, #004D36)',
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

const BackgroundDark = ({ primaryColor }) => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #121212, #1E1E1E)'
  }}>
    <Box className="dark-effect" sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.7
    }}>
      <Box className="dark-blob" sx={{
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
      <Box className="dark-blob" sx={{
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

const BackgroundCyberpunk = ({ primaryColor }) => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #000000, #1a1a2e)'
  }}>
    <Box className="cyberpunk-effect" sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.7
    }}>
      <Box className="cyberpunk-blob" sx={{
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
      <Box className="cyberpunk-blob" sx={{
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
      <Box className="cyberpunk-grid" sx={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 215, 0, .05) 25%, rgba(255, 215, 0, .05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, .05) 75%, rgba(255, 215, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 215, 0, .05) 25%, rgba(255, 215, 0, .05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, .05) 75%, rgba(255, 215, 0, .05) 76%, transparent 77%, transparent)',
        backgroundSize: '40px 40px',
        top: '-50%',
        left: '-50%',
        animation: 'cyberpunkMove 120s linear infinite'
      }} />
    </Box>
  </Box>
);

const BackgroundRGB = () => (
  <Box sx={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
    background: 'linear-gradient(to bottom, #000000, #121212)'
  }}>
    <Box className="rgb-effect" sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.8
    }}>
      <Box className="rainbow-bg" sx={{
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
      <Box className="gaming-grid" sx={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .03) 25%, rgba(255, 255, 255, .03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .03) 75%, rgba(255, 255, 255, .03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .03) 25%, rgba(255, 255, 255, .03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .03) 75%, rgba(255, 255, 255, .03) 76%, transparent 77%, transparent)',
        backgroundSize: '30px 30px',
        top: '-50%',
        left: '-50%',
        animation: 'cyberpunkMove 60s linear infinite'
      }} />
      <Box className="rgb-circle-1" sx={{
        position: 'absolute',
        width: { xs: '150px', md: '200px' },
        height: { xs: '150px', md: '200px' },
        borderRadius: '50%',
        border: '2px solid rgba(255,0,0,0.3)',
        top: '30%',
        left: '20%',
        animation: 'pulse 2s ease-in-out infinite alternate'
      }} />
      <Box className="rgb-circle-2" sx={{
        position: 'absolute',
        width: { xs: '120px', md: '180px' },
        height: { xs: '120px', md: '180px' },
        borderRadius: '50%',
        border: '2px solid rgba(0,255,0,0.3)',
        top: '60%',
        left: '70%',
        animation: 'pulse 3s ease-in-out infinite alternate-reverse'
      }} />
      <Box className="rgb-circle-3" sx={{
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

// Difficulty Stars component
const DifficultyStars = ({ level }) => {
  const filledStars = level;
  const totalStars = 3;
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon 
          key={index} 
          sx={{ 
            color: index < filledStars ? 'inherit' : '#ccc',
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }
          }} 
        />
      ))}
    </Box>
  );
};

// Create theme function
const getTheme = (mode, fluoColor, fontFamily) =>
  createTheme({
    typography: { 
      fontFamily,
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
      }
    },
    palette: {
      mode,
      primary: { main: mode === 'dark' ? fluoColor : '#00A176' },
      secondary: { main: mode === 'dark' ? fluoColor : '#1E3A5F' },
      background: {
        default: mode === 'dark' ? '#121212' : '#ffffff',
        paper: mode === 'dark' ? '#1E1E1E' : '#ffffff'
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#1E3A5F',
        secondary: mode === 'dark' ? '#B0B0B0' : '#6B7280'
      }
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { 
                borderColor: mode === 'dark' ? fluoColor : '#00A176',
                borderWidth: '2px'
              }
            },
            '& .MuiInputLabel-root.Mui-focused': { 
              color: mode === 'dark' ? fluoColor : '#00A176' 
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            padding: '8px 16px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark' 
                ? `0 6px 12px ${alpha(fluoColor, 0.3)}`
                : '0 6px 12px rgba(0, 161, 118, 0.3)'
            }
          },
          containedPrimary: {
            background: mode === 'dark' 
              ? `linear-gradient(45deg, ${fluoColor}, ${alpha(fluoColor, 0.8)})`
              : 'linear-gradient(45deg, #00A176, #008E67)',
            '&:hover': {
              background: mode === 'dark' 
                ? `linear-gradient(45deg, ${fluoColor}, ${alpha(fluoColor, 0.9)})`
                : 'linear-gradient(45deg, #008E67, #00A176)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            boxShadow: mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 142, 103, 0.2)'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(5px)',
            boxShadow: 'none',
            background: mode === 'dark' 
              ? 'rgba(30, 30, 30, 0.8)'
              : 'rgba(255, 255, 255, 0.8)'
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9rem',
            minHeight: '48px'
          }
        }
      }
    }
  });

// Main Login Component
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Refs
  const soundManagerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Form states
  const [tabValue, setTabValue] = useState(0);
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Personalization states
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Theme states
  const [colorMode, setColorMode] = useState('system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [fluoColorIndex, setFluoColorIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isNightTime = currentTime.getHours() >= 19 || currentTime.getHours() < 7;

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Determine actual theme mode
  let actualMode = 'light';
  if (
    colorMode === 'dark' ||
    (colorMode === 'system' && prefersDarkMode) ||
    (colorMode === 'auto' && isNightTime)
  ) {
    actualMode = 'dark';
  }

  // Set primary color
  const primaryColor = actualMode === 'dark' 
    ? (fluoColors[fluoColorIndex].value === 'rainbow' 
        ? '#00BFFF' // Default value for RGB mode
        : fluoColors[fluoColorIndex].value)
    : "#00A176";
  
  // Detect if in RGB mode
  const isRgbMode = actualMode === 'dark' && fluoColors[fluoColorIndex].value === 'rainbow';
  
  // Create theme
  const theme = getTheme(actualMode, primaryColor, fonts[fontIndex].value);

  // Initialize sound manager
  useEffect(() => {
    soundManagerRef.current = new SoundManager();
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Add key press sound effect
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only play sound if an input is focused
      const tagName = document.activeElement.tagName.toLowerCase();
      if ((tagName === 'input' || tagName === 'textarea') && soundManagerRef.current && soundEnabled) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
          soundManagerRef.current.playTypingSound(e.key);
        }, 5);
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [soundEnabled]);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (soundManagerRef.current) {
      soundManagerRef.current.playModeChangeSound();
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    if (soundManagerRef.current) {
      soundManagerRef.current.playTogglePasswordSound(!showPassword);
    }
  };

  // Toggle sound
  const toggleSound = () => {
    if (soundManagerRef.current) {
      const isMuted = soundManagerRef.current.toggleMute();
      setSoundEnabled(!isMuted);
    }
  };

  // Toggle drawer
  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  // Cycle through color modes
  const cycleColorMode = () => {
    setColorMode(prev => {
      const nextMode = {
        'light': 'dark',
        'dark': 'auto',
        'auto': 'system',
        'system': 'light'
      }[prev];
      
      if (soundManagerRef.current) {
        soundManagerRef.current.playModeChangeSound();
      }
      
      return nextMode;
    });
  };

  // Get icon for current mode
  const getModeIcon = () => {
    switch (colorMode) {
      case 'light': return <LightModeIcon />;
      case 'dark': return <DarkModeIcon />;
      case 'auto': return <SettingsBrightnessIcon />;
      case 'system': return prefersDarkMode ? <DarkModeIcon /> : <LightModeIcon />;
      default: return <SettingsBrightnessIcon />;
    }
  };

  // Avatar selection handler
  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
    if (soundManagerRef.current) {
      soundManagerRef.current.playAvatarSound(avatarId);
    }
  };
  
  // Difficulty selection handler
  const handleDifficultySelect = (difficultyId) => {
    setSelectedDifficulty(difficultyId);
    if (soundManagerRef.current) {
      soundManagerRef.current.playDifficultySound(difficultyId);
    }
  };

  // Handle input changes with visual effects
  const handleInputChange = (e, setter) => {
    const input = e.target;
    setter(input.value);
    
    // Add animation class when typing
    input.classList.add('typing-glow');
    setTimeout(() => input.classList.remove('typing-glow'), 300);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Registration form validations
    if (tabValue === 1) {
      if (!selectedAvatar) {
        setError('Por favor selecciona un avatar');
        setLoading(false);
        if (soundManagerRef.current) {
          soundManagerRef.current.playErrorSound();
        }
        return;
      }
      
      if (!selectedDifficulty) {
        setError('Por favor selecciona un nivel de dificultad');
        setLoading(false);
        if (soundManagerRef.current) {
          soundManagerRef.current.playErrorSound();
        }
        return;
      }
    }
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (matricula && password) {
        if (tabValue === 0) {
          // Login
          login('dummy-token');
          
          if (soundManagerRef.current) {
            soundManagerRef.current.playSuccessSound();
          }
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // Registration success
          if (soundManagerRef.current) {
            soundManagerRef.current.playSuccessSound();
          }
          
          setTimeout(() => {
            setTabValue(0);
            setMatricula('');
            setPassword('');
          }, 1000);
        }
      } else {
        setError('Por favor completa todos los campos');
        if (soundManagerRef.current) {
          soundManagerRef.current.playErrorSound();
        }
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intente nuevamente.');
      if (soundManagerRef.current) {
        soundManagerRef.current.playErrorSound();
      }
    } finally {
      setLoading(false);
    }
  };

  // Get label for current mode
  const modeLabel = (() => {
    if (colorMode === 'auto') return `${isNightTime ? 'Modo Noche' : 'Modo Día'} (Auto)`;
    if (colorMode === 'system') return prefersDarkMode ? 'Preferencia: Oscuro' : 'Preferencia: Claro';
    return colorMode === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
  })();

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: { xs: 250, sm: 300 }, height: '100%', p: 2, bgcolor: actualMode === 'dark' ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.95)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Logo isDarkMode={actualMode === 'dark'} primaryColor={primaryColor} size={40} />
        <Typography variant="h6" sx={{ ml: 2, color: actualMode === 'dark' ? '#fff' : '#1E3A5F' }}>
          Configuración
        </Typography>
      </Box>
      
      <Typography variant="body2" sx={{ color: actualMode === 'dark' ? '#aaa' : '#666' }}>
        {modeLabel}
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <List>
        <ListItem>
          <ListItemText primary="Cambiar Modo" />
          <IconButton onClick={cycleColorMode} sx={{ color: primaryColor }}>
            {getModeIcon()}
          </IconButton>
        </ListItem>
        
        <Divider />
        
        {actualMode === 'dark' && (
          <>
            <ListItem>
              <ListItemText primary="Color" secondary={fluoColors[fluoColorIndex].name} />
              <Button
                variant="outlined"
                onClick={() => setFluoColorIndex((fluoColorIndex + 1) % fluoColors.length)}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  borderRadius: '8px',
                  borderColor: primaryColor,
                  color: primaryColor,
                  ml: 2
                }}
              >
                Cambiar
              </Button>
            </ListItem>
            
            <Divider />
          </>
        )}
        
        <ListItem>
          <ListItemText primary="Tipografía" secondary={fonts[fontIndex].name} />
          <Button
            variant="outlined"
            onClick={() => setFontIndex((fontIndex + 1) % fonts.length)}
            sx={{
              textTransform: 'none',
              fontSize: '0.8rem',
              borderRadius: '8px',
              borderColor: primaryColor,
              color: primaryColor,
              ml: 2
            }}
          >
            Cambiar
          </Button>
        </ListItem>
        
        <Divider />
        
        <ListItem>
          <ListItemText primary="Sonido" secondary={soundEnabled ? "Activado" : "Desactivado"} />
          <IconButton onClick={toggleSound} sx={{ color: primaryColor }}>
            {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </ListItem>
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="body2" sx={{ color: actualMode === 'dark' ? '#aaa' : '#666', textAlign: 'center' }}>
        © 2025 DoReMi. Todos los derechos reservados.
      </Typography>
    </Box>
  );

  // Animation and styling
  // Bouncing Circle component
  const BouncingCircle = ({ color, size, delay, duration, position }) => {
    return (
      <Box
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
  };
  
  // Generate random circles for animation
  const generateRandomCircles = (count, mode, primaryColor) => {
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
          // RGB mode uses rainbow colors
          const hue = Math.floor(Math.random() * 360);
          color = `hsla(${hue}, 80%, 60%, 0.3)`;
        } else {
          // Dark mode - use primary color with varying transparency
          color = alpha(primaryColor, 0.1 + Math.random() * 0.2);
        }
      } else {
        // Light mode - use soft colors
        const hue = 140 + Math.floor(Math.random() * 40); // greens
        color = `hsla(${hue}, ${60 + Math.random() * 20}%, ${70 + Math.random() * 20}%, 0.2)`;
      }
      
      circles.push(
        <BouncingCircle
          key={i}
          color={color}
          size={size}
          delay={delay}
          duration={duration}
          position={position}
        />
      );
    }
    
    return circles;
  };

  const globalStyles = `
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
    
    @keyframes blob1 {
      0% { transform: translate(-50%, -50%) scale(1); }
      33% { transform: translate(-30%, -60%) scale(1.2); }
      66% { transform: translate(-60%, -40%) scale(0.8); }
      100% { transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes blob2 {
      0% { transform: translate(-50%, -50%) scale(1); }
      33% { transform: translate(-60%, -40%) scale(0.9); }
      66% { transform: translate(-40%, -30%) scale(1.1); }
      100% { transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes rainbow {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    
    @keyframes cyberpunkMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-50px, -50px); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.1); opacity: 0.7; }
    }
    
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes bounce {
      0% { transform: translate(0, 0); }
      50% { transform: translate(0, -20px); }
      100% { transform: translate(0, 0); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .typing-glow {
      animation: glow 0.3s ease-in-out;
    }
    
    @keyframes glow {
      0% { box-shadow: 0 0 0 0 rgba(0, 161, 118, 0.5); }
      50% { box-shadow: 0 0 10px 4px rgba(0, 161, 118, 0.5); }
      100% { box-shadow: 0 0 0 0 rgba(0, 161, 118, 0.5); }
    }
  `;

  // Generate bouncing circles
  const circleCount = useMediaQuery('(max-width: 600px)') ? 6 : 12;
  const bouncingCircles = generateRandomCircles(circleCount, actualMode, primaryColor);
  
  // Handle button hover sound
  const handleButtonHover = () => {
    if (soundManagerRef.current && soundEnabled) {
      soundManagerRef.current.playButtonHoverSound();
    }
  };
  
  // Handle bubble/pop sound effect
  const playBubbleSound = () => {
    if (soundManagerRef.current && soundEnabled) {
      soundManagerRef.current.playBubbleSound();
    }
  };

  // Effect for mobile optimizations
  useEffect(() => {
    // Set meta viewport for mobile
    const setMobileViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      } else {
        const newViewport = document.createElement('meta');
        newViewport.name = 'viewport';
        newViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
        document.head.appendChild(newViewport);
      }
    };
    
    setMobileViewport();
    
    // Add random bubble sounds for interactive feeling
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && soundEnabled) {
        playBubbleSound();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [soundEnabled]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Global styles */}
      <style>{globalStyles}</style>
      
      {/* Bouncing circles */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: -5, 
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {bouncingCircles}
      </Box>
      
      {/* Background based on theme mode */}
      {actualMode === 'light' ? (
        <BackgroundLight />
      ) : isRgbMode ? (
        <BackgroundRGB />
      ) : fluoColors[fluoColorIndex].name === "Amarillo Cyberpunk" ? (
        <BackgroundCyberpunk primaryColor={primaryColor} />
      ) : (
        <BackgroundDark primaryColor={primaryColor} />
      )}
      
      {/* App Bar */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          bgcolor: actualMode === 'dark' ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 10
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            left: 16,
            color: actualMode === 'dark' ? '#fff' : '#1E3A5F',
            transition: 'transform 0.3s ease',
            transform: drawerOpen ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        
        <Typography variant="h6" sx={{ color: actualMode === 'dark' ? '#fff' : '#1E3A5F', fontWeight: 'bold' }}>
          DoReMi
        </Typography>
        
        <Tooltip title={soundEnabled ? "Desactivar sonido" : "Activar sonido"}>
          <IconButton 
            onClick={toggleSound} 
            sx={{ 
              position: 'absolute',
              right: 16,
              color: actualMode === 'dark' ? '#fff' : '#1E3A5F' 
            }}
          >
            {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Settings Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
      
      {/* Main content */}
      <Container 
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          pt: { xs: 8, sm: 9 }, // Space for App Bar
          pb: { xs: 3, sm: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Welcome section - hidden on small screens */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            pr: 4,
            mb: 4
          }}
        >
          <Box sx={{ 
            animation: 'float 4s ease-in-out infinite',
            mb: 3
          }}>
            <Logo 
              isDarkMode={actualMode === 'dark'} 
              primaryColor={primaryColor}
              size={120}
            />
          </Box>
          
          <Typography
            variant="h2"
            className={isRgbMode ? 'rgb-text' : ''}
            sx={{
              fontWeight: 'bold',
              color: actualMode === 'dark' ? primaryColor : "#1E3A5F",
              textAlign: 'center',
              fontSize: { md: '2.5rem', lg: '3rem' },
              mb: 2
            }}
          >
            ¡Bienvenido a DoReMi!
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              maxWidth: '90%',
              mb: 4
            }}
          >
            La plataforma educativa donde aprender es divertido
          </Typography>
          
          <Box 
            sx={{ 
              width: '80%',
              height: '180px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <SchoolIcon 
              sx={{ 
                fontSize: '120px', 
                opacity: 0.6,
                color: actualMode === 'dark' ? primaryColor : '#00A176',
                animation: 'float 5s ease-in-out infinite',
              }} 
            />
          </Box>
        </Box>
        
        {/* Login/Register Form */}
        <Paper
          elevation={5}
          sx={{
            width: { xs: '100%', sm: '450px', md: '400px' },
            maxWidth: '100%',
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            border: actualMode === 'dark' 
              ? (isRgbMode ? 'none' : '3px solid ' + primaryColor) 
              : 'none',
            backgroundColor: actualMode === 'dark' ? 'rgba(30,30,30,0.9)' : 'rgba(255,255,255,0.95)',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            className: isRgbMode ? 'rgb-border' : '',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Logo (visible only on small screens) */}
          <Box sx={{ 
            mb: 3, 
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Box sx={{ animation: 'float 3s ease-in-out infinite' }}>
              <Logo isDarkMode={actualMode === 'dark'} primaryColor={primaryColor} />
            </Box>
            <Typography
              variant="h5"
              className={isRgbMode ? 'rgb-text' : ''}
              sx={{
                mt: 2,
                fontWeight: 'bold',
                color: actualMode === 'dark' ? primaryColor : "#1E3A5F"
              }}
            >
              DoReMi
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Plataforma Educativa
            </Typography>
          </Box>
          
          {/* Tabs for Login/Register */}
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                color: actualMode === 'dark' ? '#B0B0B0' : '#6B7280',
              },
              '& .Mui-selected': {
                color: actualMode === 'dark' ? primaryColor : '#00A176',
                fontWeight: 'bold'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: actualMode === 'dark' ? primaryColor : '#00A176'
              }
            }}
          >
            <Tab label="Iniciar Sesión" />
            <Tab label="Registrarse" />
          </Tabs>
          
          {/* Error message */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2, 
                animation: 'shake 0.5s linear',
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Avatar selection (only in register tab) */}
            {tabValue === 1 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
                  Selecciona tu avatar
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                  {avatarOptions.map((option) => (
                    <Grid item key={option.id} xs={4} sm={4} md={4}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'center',
                          position: 'relative',
                          '&::after': selectedAvatar === option.id ? {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: { xs: '45px', sm: '60px' },
                            height: { xs: '45px', sm: '60px' },
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            animation: 'ripple 1.5s linear infinite',
                            border: '2px solid ' + option.color,
                            opacity: 0.6
                          } : {}
                        }}
                      >
                        <Avatar
                          sx={{
                            width: { xs: 45, sm: 50, md: 56 },
                            height: { xs: 45, sm: 50, md: 56 },
                            bgcolor: option.color,
                            cursor: 'pointer',
                            border: selectedAvatar === option.id ? `3px solid ${primaryColor}` : '3px solid transparent',
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            transition: 'all 0.3s ease',
                            zIndex: 2,
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                            }
                          }}
                          className={selectedAvatar === option.id ? 'avatar-bounce' : ''}
                          onClick={() => handleAvatarSelect(option.id)}
                          onMouseEnter={handleButtonHover}
                        >
                          {option.icon}
                        </Avatar>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Difficulty selection (only in register tab) */}
            {tabValue === 1 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
                  Nivel de dificultad
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                  {difficultyLevels.map((level) => (
                    <Grid item xs={4} key={level.id}>
                      <Paper
                        elevation={selectedDifficulty === level.id ? 6 : 1}
                        sx={{
                          p: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                          bgcolor: selectedDifficulty === level.id ? 
                            (actualMode === 'dark' ? `${level.color}30` : `${level.color}20`) : 
                            'background.paper',
                          border: selectedDifficulty === level.id ? `2px solid ${level.color}` : '2px solid transparent',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: `${level.color}20`,
                            transform: 'translateY(-2px)'
                          }
                        }}
                        onClick={() => handleDifficultySelect(level.id)}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: level.color, 
                            fontWeight: selectedDifficulty === level.id ? 'bold' : 'normal',
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }
                          }}
                        >
                          {level.label}
                        </Typography>
                        <Box sx={{ mt: 0.5, color: level.color, display: 'flex' }}>
                          <DifficultyStars level={level.stars} />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Form fields */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="matricula"
              label="Matrícula"
              name="matricula"
              autoComplete="username"
              autoFocus
              value={matricula}
              onChange={(e) => handleInputChange(e, setMatricula)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: actualMode === 'dark' ? primaryColor : "#1E3A5F" }} />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: actualMode === 'dark' ? primaryColor : "#1E3A5F" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label="toggle password visibility" 
                      onClick={handleTogglePassword} 
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Login tab extras */}
            {tabValue === 0 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 }
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                      size="small"
                      sx={{
                        color: actualMode === 'dark' ? primaryColor : "#1E3A5F",
                        '&.Mui-checked': { color: actualMode === 'dark' ? primaryColor : '#00A176' }
                      }}
                    />
                  }
                  label={<Typography variant="body2">Recordarme</Typography>}
                />
                <Link
                  href="#"
                  variant="body2"
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    color: actualMode === 'dark' ? primaryColor : '#00A176',
                    position: 'relative',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    textDecoration: 'none',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-2px',
                      left: '0',
                      backgroundColor: actualMode === 'dark' ? primaryColor : '#00A176',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover:after': { width: '100%' }
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
            )}
            
            {/* Notes about sound and adaptivity */}
            {tabValue === 1 && (
              <Box sx={{ mb: 3, mt: 1 }}>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', mb: 1 }}>
                  Cada avatar tiene un sonido único que te representará
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: 'center',
                  gap: 0.5,
                  mb: 2
                }}>
                  {soundEnabled && (
                    <Chip 
                      label="Sonidos Activados" 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      icon={<VolumeUpIcon />}
                      onClick={toggleSound}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                  <Chip 
                    label="Adaptativo a Móviles" 
                    size="small" 
                    color="secondary" 
                    variant="outlined"
                    icon={<EmojiNatureIcon />}
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Box>
              </Box>
            )}
            
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              onMouseEnter={handleButtonHover}
              onClick={() => {
                if (!loading && soundManagerRef.current && soundEnabled) {
                  soundManagerRef.current.playButtonClickSound();
                }
              }}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '25%',
                  right: '25%',
                  height: '2px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  transformOrigin: '50% 50%',
                  transform: loading ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  {tabValue === 0 ? 'Iniciando sesión...' : 'Registrándote...'}
                </Box>
              ) : (
                tabValue === 0 ? 'Iniciar Sesión' : 'Registrarse'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
