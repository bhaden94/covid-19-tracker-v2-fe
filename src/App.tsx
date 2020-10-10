import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ThemeProvider from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import ThemeSwitcher from './components/ThemeSwitcher';
import useTheme from '@material-ui/core/styles/useTheme';
import HeaderService from './components/header/HeaderService';
import Navbar from './components/nav/Navbar';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Navbar />
        <Route path="/" component={HeaderService} />
      </BrowserRouter>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default App;
