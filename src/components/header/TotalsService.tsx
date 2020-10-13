import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { queryCache } from 'react-query'
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
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

const TotalsService = ({ location }: RouteComponentProps) => {
    const [title, setTitle] = useState<string>('United States');
    const [stateUrl, setStateUrl] = useState<string>('/api/state/all')
    const [countryUrl, setCountryUrl] = useState<string>('/api/country/all')
    const [queryPlace, setQueryPlace] = useState<string>('california');

    useEffect(() => {
        prefetchStates();
        prefetchCountries();
    }, [])

    return (
        <Switch>
            <Route exact path="/united_states" 
                render={() => <Totals title='United States' type='state' />} 
            />
            <Route exact path="/united_states/:state" 
                render={() => <Totals title='Delaware' type='state' name='delaware' />} 
            />
            <Route exact path="/world" 
                render={() => <Totals title='World' type='country' />} 
            />
            {/* <Route exact path="/world/:country" 
                render={() => <Totals title={title} url={`/api/country?name=${queryPlace}`} />} 
            /> */}
        </Switch>
    );
};

export default withRouter(TotalsService);