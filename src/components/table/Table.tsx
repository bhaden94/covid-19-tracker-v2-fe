import * as React from "react";
import MaterialTable from "material-table";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Country } from "../../utilities/CountryObj";
import { State } from "../../utilities/StateObj";
import { blue, deepPurple } from "@material-ui/core/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import { useQuery } from "react-query";
import { fetchDiff } from "../../queries/fetchDiff";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) => ({
	links: {
		textDecoration: "none",
		color: blue[600],
		"&:visited": {
			color:
				theme.palette.type === "light"
					? deepPurple[500]
					: deepPurple[200],
		},
		"&:hover": {
			textDecoration: "underline",
		},
	},
}));

interface RouterProps {
	state: string;
	country: string;
}

interface ITableProps extends RouteComponentProps<RouterProps> {
	type: string;
}

const Table = ({ type, location }: ITableProps) => {
	const [days, setDays] = useState<number>(7);
	const { isLoading, isError, data } = useQuery(
		["differences", type, days],
		fetchDiff
	);

	const handleChange = (event: any) => {
		setDays(event.taget.value);
	};

	const theme: Theme = useTheme();
	const classes = useStyles();
	const [chosenObj, setChosenObj] = useState(State);
	const columns: any[] = [
		{
			title: type.charAt(0).toUpperCase() + type.slice(1),
			field: "name",
			render: (rowData: any) => {
				return (
					<Typography
						component={Link}
						to={`${location.pathname}/${rowData.name}`}
						className={classes.links}
					>
						{rowData.name}
					</Typography>
				);
			},
			headerStyle: {
				color: theme.palette.text.secondary,
			},
		},
		{
			title: (
				<div>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={days}
						onChange={handleChange}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={7}>7</MenuItem>
						<MenuItem value={14}>14</MenuItem>
					</Select>
					-Day change
				</div>
			),
			field: "daysChange",
			type: "numeric",
		},
	];

	const options: any = {
		pageSizeOptions: [10, 25, 50],
		pageSize: 10,
		showTitle: false,
		searchFieldAlignment: "left",
		exportAllData: true,
		exportButton: true,
		padding: "dense",
		headerStyle: {
			color: theme.palette.text.secondary,
		},
		rowStyle: {
			color: theme.palette.text.secondary,
		},
		style: {
			color: "red",
		},
	};

	useEffect(() => {
		type === "state" ? setChosenObj(State) : setChosenObj(Country);
	}, [type]);

	if (isLoading) {
		return (
			<Skeleton
				variant="rect"
				width="100%"
				animation="wave"
				style={{ borderRadius: "5px" }}
			>
				<MaterialTable columns={columns} options={options} data={[]} />
			</Skeleton>
		);
	}

	if (isError) {
		return <span>Error</span>;
	}

	return (
		<MaterialTable
			columns={columns}
			style={{ minHeight: "100%" }}
			data={Object.keys(chosenObj).map((e: string) => {
				return {
					name: chosenObj[e],
					daysChange: data[chosenObj[e].toLowerCase()],
				};
			})}
			options={options}
		/>
	);
};

export default withRouter(Table);
