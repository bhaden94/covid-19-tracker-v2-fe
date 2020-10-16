import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Totals from './Totals'

const TotalsService = () => {
    return (
        <Switch>
            <Route exact path="/united_states" 
                render={() => <Totals title='United States' type='state' single={false} />} 
            />
            <Route exact path="/united_states/:state" 
                render={() => <Totals type='state' single={true} />} 
            />
            <Route exact path="/world" 
                render={() => <Totals title='World' type='country' single={false} />} 
            />
            <Route exact path="/world/:country" 
                render={() => <Totals type='country' single={true} />} 
            />
        </Switch>
    );
};

export default TotalsService;