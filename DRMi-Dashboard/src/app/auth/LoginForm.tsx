// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/LoginForm.tsx

import React from 'react';
import { Box, Paper, Tabs, Tab, Alert, TextField, InputAdornment, IconButton, FormControlLabel, Checkbox, Link, Typography, Grid, CircularProgress, Button, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import AvatarSelection from './AvatarSelection';
import DifficultySelection from './DifficultySelection';

export interface LoginFormProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  matricula: string;
  setMatricula: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  loading: boolean;
  showPassword: boolean;
  handleTogglePassword: () => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  selectedAvatar: number | null;
  setSelectedAvatar: (id: number) => void;
  avatarOptions: { id: number; color: string; icon: string; sound: string }[];
  selectedDifficulty: string | null;
  setSelectedDifficulty: (id: string) => void;
  difficultyLevels: { id: string; label: string; color: string; icon: JSX.Element; stars: number }[];
  soundEnabled: boolean;
  toggleSound: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: (value: string) => void) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  primaryColor: string;
  actualMode: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  tabValue,
  handleTabChange,
  matricula,
  setMatricula,
  password,
  setPassword,
  error,
  loading,
  showPassword,
  handleTogglePassword,
  rememberMe,
  setRememberMe,
  selectedAvatar,
  setSelectedAvatar,
  avatarOptions,
  selectedDifficulty,
  setSelectedDifficulty,
  difficultyLevels,
  soundEnabled,
  toggleSound,
  handleInputChange,
  handleSubmit,
  primaryColor,
  actualMode,
}) => {
  return (
    <Paper
      elevation={5}
      sx={{
        width: { xs: '100%', sm: '450px', md: '400px' },
        maxWidth: '100%',
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        border: actualMode === 'dark'
          ? (actualMode === 'dark' ? `3px solid ${primaryColor}` : 'none')
          : 'none',
        backgroundColor: actualMode === 'dark' ? 'rgba(30,30,30,0.9)' : 'rgba(255,255,255,0.95)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Logo para pantallas pequeñas */}
      <Box sx={{ mb: 3, display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ animation: 'float 3s ease-in-out infinite' }}>
          {/* Aquí podrías reutilizar el componente Logo si lo deseas */}
        </Box>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: actualMode === 'dark' ? primaryColor : "#1E3A5F" }}>
          DoReMi
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Plataforma Educativa
        </Typography>
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          '& .MuiTab-root': { color: actualMode === 'dark' ? '#B0B0B0' : '#6B7280' },
          '& .Mui-selected': { color: actualMode === 'dark' ? primaryColor : '#00A176', fontWeight: 'bold' },
          '& .MuiTabs-indicator': { backgroundColor: actualMode === 'dark' ? primaryColor : '#00A176' },
        }}
      >
        <Tab label="Iniciar Sesión" />
        <Tab label="Registrarse" />
      </Tabs>
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2, animation: 'shake 0.5s linear', '& .MuiAlert-icon': { color: '#f44336' } }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        {tabValue === 1 && (
          <>
            <AvatarSelection
              selectedAvatar={selectedAvatar}
              onSelect={setSelectedAvatar}
              avatarOptions={avatarOptions}
              primaryColor={primaryColor}
            />
            <DifficultySelection
              selectedDifficulty={selectedDifficulty}
              onSelect={setSelectedDifficulty}
              difficultyLevels={difficultyLevels}
              actualMode={actualMode}
            />
          </>
        )}
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
            ),
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
                <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        {tabValue === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                  size="small"
                  sx={{
                    color: actualMode === 'dark' ? primaryColor : "#1E3A5F",
                    '&.Mui-checked': { color: actualMode === 'dark' ? primaryColor : '#00A176' },
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
                  transition: 'width 0.3s ease-in-out',
                },
                '&:hover:after': { width: '100%' },
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mb: 3, mt: 1 }}>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', mb: 1 }}>
              Cada avatar tiene un sonido único que te representará
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, mb: 2 }}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          onMouseEnter={() => {}}
          onClick={() => {}}
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
              transition: 'transform 0.3s ease',
            },
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
  );
};

export default LoginForm;
