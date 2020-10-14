import * as React from 'react';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { queryCache } from 'react-query'

import { fetchData } from '../../queries/fetchData'
import Totals from './Totals'

const prefetchStates = async () => {
    await queryCache.prefetchQuery('state', () => fetchData('state'))
    // The results of this query will be cached like a normal query
}

const prefetchCountries = async () => {
    await queryCache.prefetchQuery('country', () => fetchData('country'))
    // The results of this query will be cached like a normal query
}

const TotalsService = () => {

    useEffect(() => {
        prefetchStates();
        prefetchCountries();
    }, [])

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