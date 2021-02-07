import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Rate from "./Rate";

interface IRateRoutesProps {
	rate: string;
}

const RateRoutes = ({ rate }: IRateRoutesProps) => {
	return (
		<Switch>
			<Route
				exact
				path="/united_states"
				render={() => <Rate rate={rate} type="state" single={false} />}
			/>
			<Route
				exact
				path="/united_states/:state"
				render={() => <Rate rate={rate} type="state" single={true} />}
			/>
			<Route
				exact
				path="/world"
				render={() => (
					<Rate rate={rate} type="country" single={false} />
				)}
			/>
			<Route
				exact
				path="/world/:country"
				render={() => <Rate rate={rate} type="country" single={true} />}
			/>
		</Switch>
	);
};

export default RateRoutes;
