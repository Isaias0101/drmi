// /Users/isaias/Desktop/drmi_edu/DRMi-Dashboard/src/app/auth/DifficultySelection.tsx

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export interface DifficultyLevel {
  id: string;
  label: string;
  color: string;
  icon: JSX.Element;
  stars: number;
}

interface DifficultyStarsProps {
  level: number;
}

const DifficultyStars: React.FC<DifficultyStarsProps> = ({ level }) => {
  const totalStars = 3;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {Array.from({ length: totalStars }).map((_, index) => (
        <StarIcon 
          key={index}
          sx={{
            color: index < level ? 'inherit' : '#ccc',
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }
          }}
        />
      ))}
    </Box>
  );
};

interface DifficultySelectionProps {
  selectedDifficulty: string | null;
  onSelect: (difficultyId: string) => void;
  difficultyLevels: DifficultyLevel[];
  actualMode: string;
}

const DifficultySelection: React.FC<DifficultySelectionProps> = ({ selectedDifficulty, onSelect, difficultyLevels, actualMode }) => {
  return (
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
                bgcolor: selectedDifficulty === level.id
                  ? (actualMode === 'dark' ? `${level.color}30` : `${level.color}20`)
                  : 'background.paper',
                border: selectedDifficulty === level.id ? `2px solid ${level.color}` : '2px solid transparent',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: `${level.color}20`,
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={() => onSelect(level.id)}
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
  );
};

export default DifficultySelection;
