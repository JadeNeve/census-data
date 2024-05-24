import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './utils/MainRoute';
import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { useElderShip } from './contexts/ElderShipContext';

const App = () => {
  const { setElderShips } = useElderShip();

  useEffect(() => {
    // Fetch the initial data and set it to the context
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/ElderShip');
      const data = await response.json();
      setElderShips(data);
    };

    fetchData();
  }, [setElderShips]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <div className="content">
            <MainRoute />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
