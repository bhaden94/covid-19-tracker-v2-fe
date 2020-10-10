import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header'
import { useQuery } from 'react-query'
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

interface IProps {
    location: RouteComponentProps
}

const fetchStats = async () => {
    const data = await fetch('/api/state/all')
    const json = await data.json()
    return json
}

const HeaderService = ({ location }: RouteComponentProps) => {
    // const { isLoading, isError, data, error } = useQuery('todos', fetchData)
    const [title, setTitle] = useState<string>('United States');
    const { isLoading, isError, data, error } = useQuery('states', fetchStats)

    useEffect(() => {
        if (location.pathname !== '/') {
            let title = location.pathname.replace('/', '')
            title = title.toLowerCase().split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            setTitle(title)
        }
    }, [location.pathname])

    const totals = {
        confirmed: 123456,
        active: 123456,
        recovered: 123456,
        deaths: 123456
    }

    if (isLoading) {
        return <span>Loading...</span>
    }
    
    return (
        <Header title={title} totals={totals} />
    );
};

export default withRouter(HeaderService);