import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
    await queryCache.prefetchQuery(['United States'], () => fetchData('key', '/api/state/all'))
    // The results of this query will be cached like a normal query
}

const prefetchCountries = async () => {
    await queryCache.prefetchQuery(['World'], () => fetchData('key', '/api/country/all'))
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
        <BrowserRouter>
            <Route exact path="/united_states" 
                render={() => <Totals title={title} url={stateUrl} />} 
            />
            <Route exact path="/united_states/:state" 
                render={() => <Totals title={title} url={`/api/state?name=${queryPlace}`} />} 
            />
            <Route exact path="/world" 
                render={() => <Totals title={title} url={countryUrl} />} 
            />
            <Route exact path="/world/:country" 
                render={() => <Totals title={title} url={`/api/country?name=${queryPlace}`} />} 
            />
        </BrowserRouter>
    );
};

export default withRouter(TotalsService);