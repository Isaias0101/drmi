// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/SettingsDrawer.tsx

import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import Logo from './Logo';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface SettingsDrawerProps {
  actualMode: string;
  primaryColor: string;
  modeLabel: string;
  toggleDrawer: () => void;
  fluoColors: { name: string; value: string }[];
  fluoColorIndex: number;
  setFluoColorIndex: (index: number) => void;
  fonts: { name: string; value: string }[];
  fontIndex: number;
  setFontIndex: (index: number) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  actualMode,
  primaryColor,
  modeLabel,
  toggleDrawer,
  fluoColors,
  fluoColorIndex,
  setFluoColorIndex,
  fonts,
  fontIndex,
  setFontIndex,
  soundEnabled,
  toggleSound,
}) => {
  return (
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
          <IconButton onClick={toggleDrawer} sx={{ color: primaryColor }}>
            {actualMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
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
                  ml: 2,
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
              ml: 2,
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
};

export default SettingsDrawer;
