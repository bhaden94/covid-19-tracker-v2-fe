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
import RateRoutes from './components/rates/RateRoutes';

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
        <div style={{ padding: 20 }}>
          <Grid container spacing={2}>

            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <Route path="/" component={TotalsRoutes} />
              </Grid>
            </Grid>

            <Grid container xs={12} sm={8} md={6} lg={4} xl={4}>
              <Grid item xs>
                <Route path="/" component={TableRoutes} />
              </Grid>
            </Grid>

            <Grid container sm={4} md={6} lg={8} spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Route path="/" render={() => <RateRoutes rate='incident_rate' />} />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Route path="/" render={() => <RateRoutes rate='mortality_rate' />} />
              </Grid>
            </Grid>

            <Grid container md={6} lg={8}>
              <Grid item xs={12}>
                <Route path="/" component={LineChartRoutes} />
              </Grid>
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
