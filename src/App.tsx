import React, {useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ThemeProvider from './themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'
import ThemeSwitcher from './components/theme-switcher/ThemeSwitcher';
import useTheme from '@material-ui/core/styles/useTheme';
import TotalsRoutes from './components/header/TotalsRoutes';
import Navbar from './components/nav/Navbar';
import { ReactQueryDevtools } from 'react-query-devtools'
import { queryCache } from 'react-query'
import { fetchData } from './queries/fetchData'

const prefetchStates = async () => {
  await queryCache.prefetchQuery('state', () => fetchData('state'))
}

const prefetchCountries = async () => {
  await queryCache.prefetchQuery('country', () => fetchData('country'))
}

function App() {
  const theme = useTheme();

  useEffect(() => {
    prefetchStates();
    prefetchCountries();
}, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Route path="/" component={TotalsRoutes} />
      </BrowserRouter>
      <ThemeSwitcher />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
