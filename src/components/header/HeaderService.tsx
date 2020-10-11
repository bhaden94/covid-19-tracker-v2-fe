import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header'
import { useQuery } from 'react-query'
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

const HeaderService = ({ location, history }: RouteComponentProps) => {
    // const { isLoading, isError, data, error } = useQuery('todos', fetchData)
    const [title, setTitle] = useState<string>('United States');
    const [totals, setTotals] = useState<Data>({
        confirmed: 0,
        active: 0,
        recovered: 0,
        deaths: 0
    })
    const [url, setUrl] = useState<string>('/api/state/all')

    const { isLoading, isError, data } = useQuery(['states', url], fetchData)

    useEffect(() => {
        if (location.pathname === '/') {
            history.push('/united_states')
        }
    }, [location.pathname, history])

    useEffect(() => {
        let title = location.pathname.replace('/', '')
        title = title.toLowerCase().split('_').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(' ');
         
        setTitle(title)

        if(title === 'United States') {
            setUrl('/api/state/all')
        } else if (title === "World") {
            setUrl('/api/country/all')
        }
    }, [location.pathname])

    useEffect(() => {
        if(data) {
            const totals = createStats(data, location.pathname);
            setTotals({
                confirmed: totals.confirmed,
                active: totals.active,
                recovered: totals.recovered,
                deaths: totals.deaths
            })
        }
    }, [data])
    

    if (isLoading) {
        return <span>Loading...</span>
    }

    if(isError) {
        return <span>Error</span>
    }

    return (
        <Header title={title} totals={totals} />
    );
};

export default withRouter(HeaderService);