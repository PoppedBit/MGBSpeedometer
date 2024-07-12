import { Settings } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Switch,
  Typography
} from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useEffect, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [message, setMessage] = useState('');
  const [timeoutExpired, setTimeoutExpired] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!timeoutExpired) {
      navigator.geolocation.watchPosition(updateSpeed, handleError, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000
      });
    }
  }, [timeoutExpired]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#ff1744',
          },
          mode: isDarkMode ? 'dark' : 'light'
        }
      }),
    [isDarkMode]
  );

  const updateSpeed = (position: GeolocationPosition) => {
    const { speed } = position.coords;
    if (speed !== null) {
      // Convert speed to miles per hour (1 m/s = 2.23694 mph)
      const speedMph = Math.floor(speed * 2.23694);
      setSpeed(speedMph);
    } else {
      setSpeed(0);
    }
  };

  const handleError = (error: GeolocationPositionError) => {
    setMessage(`Error: ${error.message}`);
    if (error.code === 3) {
      setTimeoutExpired(true);
    }
  };

  const size =
    (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) - 40;

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: (theme) => theme.palette.background.default
        }}
      >
        <AppBar>
          <IconButton onClick={() => setIsSettingsOpen(true)}>
            <Settings />
          </IconButton>
        </AppBar>
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Gauge
            width={size * 0.9}
            height={size * 0.9}
            value={speed}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: '2.5rem',
                transform: 'translate(0px, 0px)'
              }
            }}
            text={({ value }) => `${value} mph`}
          />
          <Typography variant="h5">{message}</Typography>
          {timeoutExpired && (
            <Button
              variant="contained"
              onClick={() => {
                setTimeoutExpired(false);
                setMessage('');
              }}
            >
              Retry
            </Button>
          )}
        </Container>
      </Container>
      <Dialog open={isSettingsOpen} fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <FormLabel component="legend">Dark Theme</FormLabel>
          <Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setIsSettingsOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default App;