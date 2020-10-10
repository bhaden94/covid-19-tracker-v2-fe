import React from 'react';
import ThemeProvider from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import ThemeSwitcher from './components/ThemeSwitcher';
import useTheme from '@material-ui/core/styles/useTheme';
import HeaderService from './components/header/HeaderService';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderService />
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default App;
