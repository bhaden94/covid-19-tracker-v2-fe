import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Grid, Paper, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { deepOrange, green, red, amber } from "@material-ui/core/colors";
import { useQuery } from "react-query";
import { fetchTotals } from "../../queries/fetchTotals";
import Stat from "./Stat";
import { State } from "../../utilities/StateObj";
import { Country } from "../../utilities/CountryObj";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";

const useStyles = makeStyles({
	container: {
		margin: "0",
	},
	padTop: {
		paddingTop: "10px",
	},
	title: {
		fontSize: "2.5rem !important",
	},
	recovered: {
		fontSize: "1.5rem !important",
		color: green[500],
	},
	active: {
		fontSize: "1.5rem !important",
		color: amber[600],
	},
	confirmed: {
		fontSize: "1.5rem !important",
		color: deepOrange[400],
	},
	deaths: {
		fontSize: "1.5rem !important",
		color: red[500],
	},
});

interface RouterProps {
	state: string;
	country: string;
}
interface ITotalsProps extends RouteComponentProps<RouterProps> {
	type: string;
	single: boolean;
	title?: string;
}

interface TotalData {
	confirmed: number;
	active: number;
	recovered: number;
	deaths: number;
}

const Totals = ({ history, match, title, type, single }: ITotalsProps) => {
	const classes = useStyles();
	const [name, setName] = useState<string>("");
	const [totals, setTotals] = useState<TotalData>({
		confirmed: 0,
		active: 0,
		recovered: 0,
		deaths: 0,
	});

	// for us and world stats
	const { isLoading, isError, data } = useQuery(
		["totals", type],
		fetchTotals,
		{
			enabled: !single,
		}
	);

	// for specific state or country stats
	const specificData = useQuery(["totals", type, name], fetchTotals, {
		enabled: single && name,
	});

	useEffect(() => {
		if (data && !single) {
			setTotals({
				confirmed: data.confirmed,
				active: data.active,
				recovered: data.recovered,
				deaths: data.deaths,
			});
		} else if (specificData?.data) {
			setTotals({
				confirmed: specificData.data.confirmed,
				active: specificData.data.active,
				recovered: specificData.data.recovered,
				deaths: specificData.data.deaths,
			});
		}
	}, [data, type, title, single, specificData]);

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
				<Paper className={classes.container}>
					<Typography className={classes.title} />
					<Stat name="" stat={0} properties="" />
				</Paper>
			</Skeleton>
		);
	}

	if (isError || specificData.isError) {
		return <span>Error</span>;
	}

	return (
		<Paper className={classes.container}>
			<Grid container spacing={0}>
				<Grid item xs={12} className={classes.padTop}>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
						variant="h2"
						align="center"
					>
						{title || name}
					</Typography>
				</Grid>
				<Stat
					name="Recovered"
					stat={totals.recovered}
					properties={classes.recovered}
				/>
				<Stat
					name="Active"
					stat={totals.active}
					properties={classes.active}
				/>
				<Stat
					name="Confirmed"
					stat={totals.confirmed}
					properties={classes.confirmed}
				/>
				<Stat
					name="Deaths"
					stat={totals.deaths}
					properties={classes.deaths}
				/>
			</Grid>
		</Paper>
	);
};

export default withRouter(Totals);
