import React, { useEffect, useState } from "react";
import { deepOrange, green, red, amber } from "@material-ui/core/colors";
import {
	Chart,
	Series,
	ArgumentAxis,
	Aggregation,
	Animation,
	CommonSeriesSettings,
	Legend,
	LoadingIndicator,
	Margin,
	Title,
	Tooltip,
	Point,
	Grid,
	ZoomAndPan,
	ConstantLine,
	Label,
} from "devextreme-react/chart";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { State } from "../../utilities/StateObj";
import { Country } from "../../utilities/CountryObj";
import { Paper } from "@material-ui/core";
import TooltipTemplate from "./TooltipTemplate";
import useTheme from "@material-ui/core/styles/useTheme";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import { fetchLineChart } from "../../queries/fetchLineChart";

interface LineChartData {
	date: string;
	recovered: number;
	active: number;
	confirmed: number;
	deaths: number;
}

interface RouterProps {
	state: string;
	country: string;
}

interface ILineChartProps extends RouteComponentProps<RouterProps> {
	type: string;
	single: boolean;
}

const LineChart = ({ type, single, match, history }: ILineChartProps) => {
	const theme = useTheme();
	const [name, setName] = useState<string>("");
	const [chartData, setChartData] = useState<LineChartData[]>([]);

	// for us and world stats
	const { isLoading, isError, data } = useQuery(type, fetchLineChart, {
		enabled: !single,
		staleTime: 50000,
	});

	// for specific state or country stats
	const specificData = useQuery([type, name], fetchLineChart, {
		enabled: single && name,
		staleTime: 50000,
	});

	const resetZoom = () => {};

	useEffect(() => {
		if (data && !single) {
			setChartData(data);
		} else if (specificData?.data) {
			setChartData(specificData.data);
		}
	}, [data, type, single, specificData]);

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
			} else {
				// trying to get invalid state
				history.push("/united_states");
			}
		} else if (match.params.country) {
			if (Country.hasOwnProperty(query)) {
				setName(Country[query]);
			} else {
				// trying to get invalid country
				history.push("/world");
			}
		}
	}, [name, match, history]);

	if (isLoading || specificData.isLoading) {
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

	if (isError || specificData.isError) {
		return <span>Error</span>;
	}

	return (
		<Paper>
			<Chart dataSource={chartData}>
				<Title
					text="Data Over Time"
					font={{ color: theme.palette.text.secondary }}
				/>
				<LoadingIndicator enabled={true} />
				<CommonSeriesSettings argumentField="date" type="line">
					<Point visible={true} size="8" />
					{/* <Aggregation enabled={true} method="max" /> */}
				</CommonSeriesSettings>
				<Margin bottom={20} right={15} left={15} />
				<ArgumentAxis
					aggregationInterval={{ weeks: 1 }}
					valueMarginsEnabled={true}
					argumentType="datetime"
					discreteAxisDivisionMode="crossLabels"
				>
					<Grid visible={false} />
					<ConstantLine
						width={2}
						value={new Date(2020, 11, 11)}
						color={theme.palette.primary.main}
						dashStyle="solid"
					>
						<Label
							text="First Vaccine Approved"
							horizontalAlignment="left"
							font={{ color: theme.palette.text.secondary }}
						/>
					</ConstantLine>
				</ArgumentAxis>
				<Legend
					verticalAlignment="bottom"
					horizontalAlignment="center"
					itemTextPosition="bottom"
				/>
				<Tooltip
					enabled={true}
					border={{ color: theme.palette.background.paper }}
					cornerRadius="5"
					color={theme.palette.background.paper}
					contentRender={TooltipTemplate}
				/>
				<ZoomAndPan argumentAxis="both" dragToZoom={true} />
				<Animation
					easing="linear"
					duration={500}
					maxPointCountSupported={100}
				/>
				<Series
					valueField="recovered"
					name="Recovered"
					color={green[500]}
				/>
				<Series valueField="active" name="Active" color={amber[600]} />
				<Series
					valueField="confirmed"
					name="Confirmed"
					color={deepOrange[400]}
				/>
				<Series valueField="deaths" name="Deaths" color={red[500]} />
			</Chart>
			<button onClick={resetZoom}>reset</button>
		</Paper>
	);
};

export default withRouter(LineChart);
