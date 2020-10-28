import React, { useEffect } from 'react';
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
import TableRoutes from './components/table/TableRoutes';
import LineChartRoutes from './components/line-chart/LineChartRoutes';
import Grid from '@material-ui/core/Grid';
import 'devextreme/dist/css/dx.common.css';

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
        <div style={{ padding: 24 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Route path="/" component={TotalsRoutes} />
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
              <Route path="/" component={TableRoutes} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
              <Route path="/" component={LineChartRoutes} />
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
      <ThemeSwitcher />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
