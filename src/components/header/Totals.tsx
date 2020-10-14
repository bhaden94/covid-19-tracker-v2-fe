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
import {state} from '../../utilities/StateObj'

const useStyles = makeStyles({
    container: {
        minHeight: '100px',
        margin: '1%'
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
        color: deepOrange[500]
    },
    deaths: {
        fontSize: '1.5rem',
        color: red[500]
    }
});

interface RouterProps {
    state: string
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

const Totals = ({ match, title, type, single }: ITotalsProps) => {
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
        } else if(specificData?.data) {
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
        if(match.params.state && state.hasOwnProperty(match.params.state.split(' ').join('_'))) {
            setName(state[match.params.state.split(' ').join('_')])
        }
    }, [name, match])

    // useEffect(() => {
    //     // if(single && match?.params) {
    //     //     setName(match.params.state)
    //     // } else {
    //     //     setName("")
    //     // }
    // }, [match, single])

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error</span>
    }

    // console.log(JSON.stringify(location), JSON.stringify(match), JSON.stringify(history))

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