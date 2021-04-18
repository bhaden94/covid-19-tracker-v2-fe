import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import {
	Card,
	CardContent,
	makeStyles,
	Typography,
	Tooltip,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { fetchRates } from "../../queries/fetchRates";
import { State } from "../../utilities/StateObj";
import { Country } from "../../utilities/CountryObj";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
	title: {
		fontSize: "1.5rem !important",
	},
});

interface RouterProps {
	state: string;
	country: string;
}

interface IRateProps extends RouteComponentProps<RouterProps> {
	rate: string;
	type: string;
	single: boolean;
}

const Rate = ({ history, match, rate, type, single }: IRateProps) => {
	const classes = useStyles();
	const [title, setTitle] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [rateNumber, setRateNumber] = useState<number>();
	const [tooltipTitle, setTooltipTitle] = useState<string>("");

	// for us and world stats
	const { isLoading, isError, data } = useQuery(
		[rate, type],
		() => fetchRates(rate, type),
		{
			enabled: !single,
		}
	);

	// for specific state or country stats
	const specificData = useQuery(
		[rate, type, name],
		() => fetchRates(rate, type, name),
		{
			enabled: single && !!name,
		}
	);

	useEffect(() => {
		if (data && !single) {
			setRateNumber(Math.round(data[rate] * 100) / 100);
		} else if (specificData?.data) {
			setRateNumber(Math.round(specificData?.data[rate] * 100) / 100);
		}
	}, [data, type, rate, single, specificData]);

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

	useEffect(() => {
		if (rate === "incident_rate") {
			setTitle("Incident Rate");
			setTooltipTitle("Per 100,000 persons");
		} else {
			setTitle("Mortality Rate");
		}
	}, [rate]);

	if (isLoading || specificData.isLoading) {
		return (
			<Skeleton
				variant="rect"
				width="100%"
				height={50}
				animation="wave"
				style={{ borderRadius: "5px" }}
			></Skeleton>
		);
	}

	if (isError || specificData.isError) {
		return <span>Error</span>;
	}

	return (
		<Card>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
					align="center"
				>
					<u>{title}</u>
				</Typography>
				<Tooltip title={tooltipTitle} enterTouchDelay={50} arrow>
					<Typography
						color="textSecondary"
						gutterBottom
						align="center"
					>
						{rateNumber}
						{rate === "mortality_rate" && "%"}
					</Typography>
				</Tooltip>
			</CardContent>
		</Card>
	);
};

export default withRouter(Rate);
