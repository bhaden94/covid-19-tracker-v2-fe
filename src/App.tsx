import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ThemeProvider from "./themes";
import CssBaseline from "@material-ui/core/CssBaseline";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import useTheme from "@material-ui/core/styles/useTheme";
import TotalsRoutes from "./components/total/TotalsRoutes";
import Navbar from "./components/nav/Navbar";
import { ReactQueryDevtools } from "react-query-devtools";
import TableBarChartRoutes from "./components/table/TableBarChartRoutes";
import LineChartRoutes from "./components/line-chart/LineChartRoutes";
import Grid from "@material-ui/core/Grid";
import RateRoutes from "./components/rates/RateRoutes";
import SiteInfo from "./components/site-info/SiteInfo";
import News from "./components/news/News";
import "./App.css";
import "devextreme/dist/css/dx.common.css";

function App(props: { width: Breakpoint }) {
	const theme = useTheme();
	const { width } = props;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Navbar />
				<Route path={["/united_states", "/world"]}>
					<div style={{ padding: "20px" }}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Route path="/" component={TotalsRoutes} />
							</Grid>
							<Grid item xs={12} sm={8} md={6} lg={4}>
								<Route
									path="/"
									component={TableBarChartRoutes}
								/>
							</Grid>

							<Grid item xs={12} sm={4} md={6} lg={8}>
								<Grid
									container
									style={{ height: "100%" }}
									spacing={3}
									alignItems="center"
								>
									<Grid item xs={6} sm={12} lg={6}>
										<Route
											path="/"
											render={() => (
												<RateRoutes rate="incident_rate" />
											)}
										/>
									</Grid>
									<Grid item xs={6} sm={12} lg={6}>
										<Route
											path="/"
											render={() => (
												<RateRoutes rate="mortality_rate" />
											)}
										/>
									</Grid>
									{isWidthUp("lg", width) && (
										<Grid item xs={12}>
											<Route
												path="/"
												component={LineChartRoutes}
											/>
										</Grid>
									)}
								</Grid>
							</Grid>
							{isWidthDown("md", width) && (
								<Grid item xs={12}>
									<Route
										path="/"
										component={LineChartRoutes}
									/>
								</Grid>
							)}
						</Grid>
					</div>
				</Route>
				<Route exact path="/news" component={News} />
				<Route exact path="/site_info" component={SiteInfo} />
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} position="top-right" />
		</ThemeProvider>
	);
}

export default withWidth()(App);
