'use client';

import React from 'react';
import {
  Container,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
} from '@mui/material';
import { updateAppIcon } from 'webtonative';

const darkTheme = createTheme({
  palette{
    mode: 'dark',
    background{
      default: '#121212',
      paper: '#1E1E1E',
    },
    text{
      primary: '#FFFFFF',
    },
    primary{
      main: '#BB86FC',
    },
    secondary{
      main: '#03DAC6',
    },
  },
  typography{
    fontFamily: 'Roboto, sans-serif',
  },
});

const DynamicAppIcon = () => {
  const handleIconChange = (iconName?) => {
    updateAppIcon({
      iconName ?? null,
      active!!iconName,
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        maxWidth="sm"
        sx={{
          py,
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderRadius,
          boxShadow,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dynamic App Icon
        </Typography>
        <Stack spacing={2} direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleIconChange('icon1')}
          >
            Set Icon 1
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleIconChange('icon2')}
          >
            Set Icon 2
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleIconChange('icon3')}
          >
            Set Icon 3
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleIconChange()}
          >
            Reset Icon
          </Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default DynamicAppIcon;
