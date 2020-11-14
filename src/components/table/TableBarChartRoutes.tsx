import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import BarChart from '../bar-chart/BarChart';
import Table from './Table'

const TableBarChartRoutes = () => {
    return (
        <Switch>
            <Route exact path="/united_states" 
                render={() => <Table type='state' />} 
            />
            <Route exact path="/united_states/:state" 
                render={() => <BarChart type='state' />} 
            />
            <Route exact path="/world" 
                render={() => <Table type='country' />} 
            />
            <Route exact path="/world/:country" 
                render={() => <BarChart type='country' />} 
            />
        </Switch>
    );
};

export default TableBarChartRoutes;