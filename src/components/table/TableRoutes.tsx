import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Table from './Table'

const TableRoutes = () => {
    return (
        <Switch>
            <Route exact path="/united_states" 
                render={() => <Table type='state' />} 
            />
            <Route exact path="/world" 
                render={() => <Table type='country' />} 
            />
        </Switch>
    );
};

export default TableRoutes;