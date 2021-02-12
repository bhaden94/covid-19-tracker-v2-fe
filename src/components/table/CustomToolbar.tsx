import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(() => ({
	toolbar: {
		textAlign: "right",
		padding: "0 12px",
		"&>p": {
			padding: "0 12px",
			display: "inline-block",
		},
	},
}));

interface ITableProps {
	days: number;
	changeDays: any;
}

const CustomToobar = ({ days, changeDays }: ITableProps) => {
	const classes = useStyles();

	return (
		<div className={classes.toolbar}>
			<Typography color="textSecondary">
				Active Cases Days Difference:
			</Typography>
			<Select
				native
				value={days}
				onChange={changeDays}
			>
				<option value={1}>1</option>
				<option value={7}>7</option>
				<option value={14}>14</option>
				<option value={30}>30</option>
			</Select>
		</div>
	);
};

export default CustomToobar;
