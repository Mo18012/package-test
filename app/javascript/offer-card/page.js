'use client';
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Select,
  InputLabel,
  FormControl,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { addToSiri, loadOfferCard } from 'webtonative';
import toast from 'react-hot-toast';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
    },
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#1E1E1E',
        },
        input: {
          color: '#FFFFFF',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#AAAAAA',
          '&.Mui-focused': {
            color: '#BB86FC',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#1E1E1E',
        },
        icon: {
          color: '#FFFFFF',
        },
      },
    },
  },
});

const OfferCard = () => {
  // Siri States
  const [siriUrl, setSiriUrl] = useState('');
  const [title, setTitle] = useState('');
  const [phrase, setPhrase] = useState('');

  // Offer Card States
  const [actionUrl, setActionUrl] = useState('');
  const [btnText, setBtnText] = useState('');
  const [btnTextColor, setBtnTextColor] = useState('#FFFFFF');
  const [btnBgColor, setBtnBgColor] = useState('#111111');
  const [size, setSize] = useState('SMALL');
  const [position, setPosition] = useState('RIGHT');
  const [cardBgColor, setCardBgColor] = useState('#000000');
  const [cardContentType, setCardContentType] = useState('VIDEO');
  const [cardContentUrl, setCardContentUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [unit, setUnit] = useState('');
  const [offerCardId, setOfferCardId] = useState('');

  const handleAddToSiri = () => {
    addToSiri({
      action: 'addToSiri',
      data: {
        actionUrl: siriUrl,
        suggestedPhrase: phrase,
        title,
      },
    });
    toast.success('Added to Siri');
  };

  const handleOfferCard = () => {
    loadOfferCard({
      action: 'showOfferCard',
      data: {
        action: {
          url: actionUrl,
          button: {
            url: '',
            text: btnText,
            textColor: btnTextColor,
            bgColor: btnBgColor,
          },
        },
        card: {
          size,
          position,
          bgColor: cardBgColor,
          content: {
            type: cardContentType,
            url: cardContentUrl,
          },
        },
        schedule: {
          duration: duration || null,
          unit: unit || null,
        },
        id: offerCardId || null,
      },
    });
    toast.success('loadOfferCard Triggered');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Add To Siri
        </Typography>

        <TextField
          fullWidth
          label="Action URL"
          value={siriUrl}
          onChange={(e) => setSiriUrl(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Suggested Phrase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 5, mb: 8 }}
          onClick={handleAddToSiri}
        >
          Add To Siri
        </Button>

        <Typography variant="h4" gutterBottom>
          Offer Card
        </Typography>

        <TextField
          fullWidth
          label="Action URL"
          value={actionUrl}
          onChange={(e) => setActionUrl(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Button Text"
          value={btnText}
          onChange={(e) => setBtnText(e.target.value)}
          margin="normal"
        />

        <Box display="flex" gap={2} mt={2} alignItems="center">
          <input
            type="color"
            value={btnTextColor}
            onChange={(e) => setBtnTextColor(e.target.value)}
          />
          <Typography>Button Text Color</Typography>
        </Box>

        <Box display="flex" gap={2} mt={2} alignItems="center">
          <input
            type="color"
            value={btnBgColor}
            onChange={(e) => setBtnBgColor(e.target.value)}
          />
          <Typography>Button Bg Color</Typography>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Size</InputLabel>
          <Select value={size} onChange={(e) => setSize(e.target.value)}>
            <MenuItem value="SMALL">Small</MenuItem>
            <MenuItem value="FULL_WIDTH">Full Width</MenuItem>
            <MenuItem value="FULL_SCREEN">Full Screen</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Position</InputLabel>
          <Select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <MenuItem value="RIGHT">Right</MenuItem>
            <MenuItem value="LEFT">Left</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" gap={2} mt={2} alignItems="center">
          <input
            type="color"
            value={cardBgColor}
            onChange={(e) => setCardBgColor(e.target.value)}
          />
          <Typography>Card Bg Color</Typography>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Content Type</InputLabel>
          <Select
            value={cardContentType}
            onChange={(e) => setCardContentType(e.target.value)}
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="IMAGE">Image</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Card Content URL"
          value={cardContentUrl}
          onChange={(e) => setCardContentUrl(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Offer Card ID"
          value={offerCardId}
          onChange={(e) => setOfferCardId(e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Unit</InputLabel>
          <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="hours">Hours</MenuItem>
            <MenuItem value="days">Days</MenuItem>
            <MenuItem value="minutes">Minutes</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 5 }}
          onClick={handleOfferCard}
        >
          Load Offer Card
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default OfferCard;
