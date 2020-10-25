import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import LineChart from './LineChart'

const LineChartRoutes = () => {
    return (
        <Switch>
            <Route exact path="/united_states" 
                render={() => <LineChart type='state' single={false} />} 
            />
            <Route exact path="/united_states/:state" 
                render={() => <LineChart type='state' single={true} />} 
            />
            <Route exact path="/world" 
                render={() => <LineChart type='country' single={false} />} 
            />
            <Route exact path="/world/:country" 
                render={() => <LineChart type='country' single={true} />} 
            />
        </Switch>
    );
};

export default LineChartRoutes;