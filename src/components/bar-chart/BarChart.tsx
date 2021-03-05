import React, { useEffect, useState } from "react";
import { blue, deepPurple, red } from "@material-ui/core/colors";
import {
	Chart,
	Series,
	CommonSeriesSettings,
	Legend,
	LoadingIndicator,
	Margin,
	Title,
	Tooltip,
	ValueAxis,
	ZoomAndPan,
} from "devextreme-react/chart";
import { useQuery } from "react-query";
import { fetchBarChart } from "../../queries/fetchBarChart";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { State } from "../../utilities/StateObj";
import { Country } from "../../utilities/CountryObj";
import { BarChartData } from "../../utilities/barChartUtils";
import { Paper } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

interface RouterProps {
	state: string;
	country: string;
}

interface IBarChartProps extends RouteComponentProps<RouterProps> {
	type: string;
}

const useStyles = makeStyles(() => ({
	paper: {
		// setting this to 100% creates a problem with the Bar chart rendering smooshed
		// this could be a bug within the devextreme bar chart or somehwere in my code
		// that is just messing it up
		// for now having this be a fixed pixel height fixes the problem
		height: "555px",
	},
	height100: {
		height: "100%",
	},
}));

const breakStyle = {
	line: "straight",
	width: 1,
	color: red[500],
};

const BarChart = ({ type, match, history }: IBarChartProps) => {
	const theme = useTheme();
	const classes = useStyles();
	const [name, setName] = useState<string>("");
	const [areaName, setAreaName] = useState<string>("United States");
	const [chartData, setChartData] = useState<BarChartData[]>([]);

	// for us and world stats
	const { isLoading, isError, data } = useQuery(
		["bar_chart", type, name],
		fetchBarChart,
		{
			enabled: name,
		}
	);

	useEffect(() => {
		if (data) {
			// round to 2 decimal places
			data.forEach((element: BarChartData) => {
				element.state_country =
					Math.round(element.state_country * 100) / 100;
				element.us_world = Math.round(element.us_world * 100) / 100;
			});
			setChartData(data);
		}
	}, [data, type, name]);

	useEffect(() => {
		let query = "";
		if (match.params.state) {
			query = match.params.state.toLowerCase().split(" ").join("_");
		} else if (match.params.country) {
			// country needs regex to handle dashes as well as spaces in the name
			query = match.params.country
				.toLowerCase()
				.split(/[\s -]+/)
				.join("_");
		}

		if (match.params.state) {
			if (State.hasOwnProperty(query)) {
				setName(State[query]);
				setAreaName("United States");
			} else {
				// trying to get invalid state
				history.push("/united_states");
			}
		} else if (match.params.country) {
			if (Country.hasOwnProperty(query)) {
				setName(Country[query]);
				setAreaName("World");
			} else {
				// trying to get invalid country
				history.push("/world");
			}
		}
	}, [name, match, history]);

	if (isLoading) {
		return (
			<Skeleton
				variant="rect"
				width="100%"
				animation="wave"
				style={{ borderRadius: "5px" }}
			>
				<Chart />
			</Skeleton>
		);
	}

	if (isError) {
		return <span>Error</span>;
	}

	return (
		<Paper className={classes.paper}>
			<Chart
				id="chart"
				className={classes.height100}
				dataSource={chartData}
			>
				<Title
					text="Incident/Mortality Rate Comparisons"
					font={{ color: theme.palette.text.secondary }}
				/>
				<LoadingIndicator enabled={true} />
				<CommonSeriesSettings
					argumentField="rate"
					type="bar"
					hoverMode="allArgumentPoints"
					selectionMode="allArgumentPoints"
				/>
				<Tooltip
					enabled={true}
					border={{ color: theme.palette.background.paper }}
					cornerRadius="5"
					color={theme.palette.background.paper}
					font={{ color: theme.palette.text.secondary }}
				/>
				<Margin right={15} left={15} />
				<ZoomAndPan argumentAxis="both" />
				<Legend
					verticalAlignment="bottom"
					horizontalAlignment="center"
				/>
				<ValueAxis
					breakStyle={breakStyle}
					autoBreaksEnabled={true}
					maxAutoBreakCount={2}
				/>
				<Series
					valueField="state_country"
					name={name}
					color={blue[600]}
				/>
				<Series
					valueField="us_world"
					name={areaName}
					color={deepPurple[300]}
				/>
			</Chart>
		</Paper>
	);
};

export default withRouter(BarChart);
