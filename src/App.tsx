import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ThemeProvider from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import ThemeSwitcher from './components/ThemeSwitcher';
import useTheme from '@material-ui/core/styles/useTheme';
import TotalsService from './components/header/TotalsService';
import Navbar from './components/nav/Navbar';
import { ReactQueryDevtools } from 'react-query-devtools'

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Route path="/" component={TotalsService} />
      </BrowserRouter>
      <ThemeSwitcher />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
