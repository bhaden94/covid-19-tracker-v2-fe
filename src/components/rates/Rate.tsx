import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Card, CardContent, makeStyles, Typography, Tooltip } from '@material-ui/core';
import { queryCache, useQuery } from 'react-query';
import { fetchData } from '../../queries/fetchData';
import { State } from '../../utilities/StateObj';
import { Country } from '../../utilities/CountryObj';
import Skeleton from '@material-ui/lab/Skeleton';
import { averageRate } from '../../utilities/rateUtils';

const useStyles = makeStyles({
    title: {
        fontSize: '1.5rem'
    },
})

interface RouterProps {
    state: string
    country: string
}

interface IRateProps extends RouteComponentProps<RouterProps> {
    rate: string,
    type: string,
    single: boolean
}

const Rate = ({ history, match, rate, type, single }: IRateProps) => {
    const classes = useStyles();
    const [title, setTitle] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [rateNumber, setRateNumber] = useState<number>()
    const [tooltipTitle, setTooltipTitle] = useState<string>('')

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
            const rateNum = averageRate(data, rate, type);
            rateNum && setRateNumber(rateNum)
        } else if (specificData?.data) {
            const rateNum = averageRate(specificData.data, rate, type);
            rateNum && setRateNumber(rateNum)
        }
    }, [data, type, rate, single, specificData])

    useEffect(() => {
        let query = ''
        if (match.params.state) {
            query = match.params.state.toLowerCase().split(' ').join('_')
        } else if (match.params.country) {
            // country needs regex to handle dashes as well as spaces in the name
            query = match.params.country.toLowerCase().split(/[\s -]+/).join('_')
        }

        if (match.params.state) {
            if (State.hasOwnProperty(query)) {
                setName(State[query])
            } else {
                // trying to get invalid state
                history.push('/united_states')
            }
        } else if (match.params.country) {
            if (Country.hasOwnProperty(query)) {
                setName(Country[query])
            } else {
                // trying to get invalid country
                history.push('/world')
            }
        }
    }, [name, match, history])

    useEffect(() => {
        if(rate === 'incident_rate') {
            setTitle('Incident Rate')
            setTooltipTitle('Per 100,000 persons')
        } else {
            setTitle('Mortality Rate')
        }
    }, [rate])

    if (isLoading || specificData.isLoading) {
        return (
            <Skeleton variant="rect" width='100%' height={50} animation="wave" style={{ borderRadius: '5px' }}>
            </Skeleton>
        )
    }

    if (isError || specificData.isError) {
        return <span>Error</span>
    }

    return (
        <Card>
            <CardContent>
                <Typography className={classes.title} color='textSecondary' gutterBottom align='center'>
                    <u>{title}</u>
                </Typography>
                <Tooltip title={tooltipTitle} enterTouchDelay={50} arrow>
                    <Typography color='textSecondary' gutterBottom align='center'>
                        {rateNumber}{rate === 'mortality_rate' && '%'}
                    </Typography>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default withRouter(Rate);