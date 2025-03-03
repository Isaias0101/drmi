// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/ThemeConfig.ts

import { createTheme, alpha } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark', fluoColor: string, fontFamily: string) =>
  createTheme({
    typography: {
      fontFamily,
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 500 },
      button: { fontWeight: 500, textTransform: 'none' },
    },
    palette: {
      mode,
      primary: { main: mode === 'dark' ? fluoColor : '#00A176' },
      secondary: { main: mode === 'dark' ? fluoColor : '#1E3A5F' },
      background: {
        default: mode === 'dark' ? '#121212' : '#ffffff',
        paper: mode === 'dark' ? '#1E1E1E' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#1E3A5F',
        secondary: mode === 'dark' ? '#B0B0B0' : '#6B7280',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: mode === 'dark' ? fluoColor : '#00A176',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: mode === 'dark' ? fluoColor : '#00A176',
            },
          },
        },
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
                : '0 6px 12px rgba(0, 161, 118, 0.3)',
            },
          },
          containedPrimary: {
            background: mode === 'dark'
              ? `linear-gradient(45deg, ${fluoColor}, ${alpha(fluoColor, 0.8)})`
              : 'linear-gradient(45deg, #00A176, #008E67)',
            '&:hover': {
              background: mode === 'dark'
                ? `linear-gradient(45deg, ${fluoColor}, ${alpha(fluoColor, 0.9)})`
                : 'linear-gradient(45deg, #008E67, #00A176)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            boxShadow: mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 142, 103, 0.2)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(5px)',
            boxShadow: 'none',
            background: mode === 'dark'
              ? 'rgba(30, 30, 30, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.1)' },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9rem',
            minHeight: '48px',
          },
        },
      },
    },
  });
