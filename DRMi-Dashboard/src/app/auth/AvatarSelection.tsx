// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/AvatarSelection.tsx

import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';

export interface AvatarOption {
  id: number;
  color: string;
  icon: string;
  sound: string;
}

interface AvatarSelectionProps {
  selectedAvatar: number | null;
  onSelect: (id: number) => void;
  avatarOptions: AvatarOption[];
  primaryColor: string;
  onHover?: () => void;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ selectedAvatar, onSelect, avatarOptions, primaryColor, onHover }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
        Selecciona tu avatar
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {avatarOptions.map((option) => (
          <Grid item key={option.id} xs={4} sm={4} md={4}>
            <Box sx={{
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
                border: `2px solid ${option.color}`,
                opacity: 0.6
              } : {}
            }}>
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
                onClick={() => onSelect(option.id)}
                onMouseEnter={onHover}
              >
                {option.icon}
              </Avatar>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvatarSelection;
