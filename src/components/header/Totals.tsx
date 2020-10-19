import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Grid, Paper, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { deepOrange, green, red, amber } from '@material-ui/core/colors';
import { queryCache, useQuery } from 'react-query'
import { fetchData } from '../../queries/fetchData'
import { createStats } from '../../utilities/statUtilities'
import Stat from './Stat';
import { State } from '../../utilities/StateObj'
import { Country } from '../../utilities/CountryObj';

const useStyles = makeStyles({
    container: {
        minHeight: '100px',
        margin: '1% 0'
    },
    padTop: {
        paddingTop: '10px',
    },
    title: {
        fontSize: '2.5rem'
    },
    recovered: {
        fontSize: '1.5rem',
        color: green[500]
    },
    active: {
        fontSize: '1.5rem',
        color: amber[600]
    },
    confirmed: {
        fontSize: '1.5rem',
        color: deepOrange[400]
    },
    deaths: {
        fontSize: '1.5rem',
        color: red[500]
    }
});

interface RouterProps {
    state: string
    country: string
}
interface ITotalsProps extends RouteComponentProps<RouterProps> {
    type: string
    single: boolean
    title?: string
}

interface TotalData {
    confirmed: number
    active: number
    recovered: number
    deaths: number
}

const Totals = ({ history, match, title, type, single }: ITotalsProps) => {
    const classes = useStyles();
    const [name, setName] = useState<string>('')
    const [totals, setTotals] = useState<TotalData>({
        confirmed: 0,
        active: 0,
        recovered: 0,
        deaths: 0
    })

    // for us and world stats
    const { isLoading, isError, data } = useQuery(type, fetchData, {
        enabled: !single,
        initialData: () => {
            return queryCache.getQueryData(type)
        }
    })

    // for specific state or country stats
    const specificData = useQuery([type, name], fetchData, {
        enabled: single && name,
    })

    useEffect(() => {
        if (data && !single) {
            const totals = createStats(data, type);
            totals &&
                setTotals({
                    confirmed: totals.confirmed,
                    active: totals.active,
                    recovered: totals.recovered,
                    deaths: totals.deaths
                })
        } else if (specificData?.data) {
            const totals = createStats(specificData.data, type);
            totals &&
                setTotals({
                    confirmed: totals.confirmed,
                    active: totals.active,
                    recovered: totals.recovered,
                    deaths: totals.deaths
                })
        }
    }, [data, type, title, single, specificData])

    useEffect(() => {
        let query = ''
        if(match.params.state) {
            query = match.params.state.toLowerCase().split(' ').join('_')
        } else if(match.params.country) {
            // country needs regex to handle dashes as well as spaces in the name
            query = match.params.country.toLowerCase().split(/[\s -]+/).join('_')
        }
        
        if (match.params.state) {
            if(State.hasOwnProperty(query)) {
                setName(State[query])
            } else {
                // trying to get invalid state
                history.push('/united_states')
            }
        } else if (match.params.country) {
            if(Country.hasOwnProperty(query)) {
                setName(Country[query])
            } else {
                // trying to get invalid country
                history.push('/world')
            }
        }
    }, [name, match, history])

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error</span>
    }

    return (
        <Paper className={classes.container}>
            <Grid
                container
                spacing={0}
            >
                <Grid item xs={12} className={classes.padTop}>
                    <Typography className={classes.title} color='textSecondary' gutterBottom variant='h1' align='center'>
                        {title || name}
                    </Typography>
                </Grid>
                <Stat name='Recovered' stat={totals.recovered} properties={classes.recovered} />
                <Stat name='Active' stat={totals.active} properties={classes.active} />
                <Stat name='Confirmed' stat={totals.confirmed} properties={classes.confirmed} />
                <Stat name='Deaths' stat={totals.deaths} properties={classes.deaths} />
            </Grid>
        </Paper>
    );
};

export default withRouter(Totals);