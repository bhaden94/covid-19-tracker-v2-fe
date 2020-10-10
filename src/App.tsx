import React from 'react';
import ThemeProvider from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper, Typography } from '@material-ui/core';
import './App.css'
import ThemeSwitcher from './components/ThemeSwitcher';
import useTheme from '@material-ui/core/styles/useTheme';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography>Hello!</Typography>
      <ThemeSwitcher />
      </ThemeProvider>
  );
}

export default App;
