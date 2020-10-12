import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Totals from './Totals'
import { queryCache, useQuery } from 'react-query'
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { fetchData } from '../../queries/fetchData'
import { createStats } from './statUtilities'

interface Data {
    confirmed: number,
    active: number,
    recovered: number,
    deaths: number
}

const prefetchStates = async () => {
    await queryCache.prefetchQuery('state', () => fetchData('state'))
    // The results of this query will be cached like a normal query
}

const prefetchCountries = async () => {
    await queryCache.prefetchQuery('country', () => fetchData('country'))
    // The results of this query will be cached like a normal query
}

const TotalsService = ({ location }: RouteComponentProps) => {
    // const { isLoading, isError, data, error } = useQuery('todos', fetchData)
    const [title, setTitle] = useState<string>('United States');
    const [stateUrl, setStateUrl] = useState<string>('/api/state/all')
    const [countryUrl, setCountryUrl] = useState<string>('/api/country/all')
    const [queryPlace, setQueryPlace] = useState<string>('california');

    useEffect(() => {
        prefetchStates();
        prefetchCountries();
    }, [])

    useEffect(() => {
        let title = location.pathname.replace('/', '')
        title = title.toLowerCase().split('_').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(' ');
         
        setTitle(title)
    }, [location.pathname])

    return (
        <Switch>
            <Route exact path="/united_states" 
                render={() => <Totals title={title} type='state' />} 
            />
            <Route exact path="/united_states/:state" 
                render={() => <Totals title={title} type='state' name='california' />} 
            />
            <Route exact path="/world" 
                render={() => <Totals title={title} type='country' />} 
            />
            {/* <Route exact path="/world/:country" 
                render={() => <Totals title={title} url={`/api/country?name=${queryPlace}`} />} 
            /> */}
        </Switch>
    );
};

export default withRouter(TotalsService);