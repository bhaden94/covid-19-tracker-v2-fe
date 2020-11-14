import React, { useEffect, useState } from 'react';
import { deepOrange, green, red, amber } from '@material-ui/core/colors';
import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    LoadingIndicator,
    Margin,
    Title,
    Label,
    Format,
    Size,
} from 'devextreme-react/chart';
import { useQuery } from 'react-query';
import { fetchData } from '../../queries/fetchData';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { State } from '../../utilities/StateObj';
import { Country } from '../../utilities/CountryObj';
import { BarChartData, createChartData } from '../../utilities/barChartUtils';
import { Paper } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

interface RouterProps {
    state: string
    country: string
}

interface IBarChartProps extends RouteComponentProps<RouterProps> {
    type: string,
}

const useStyles = makeStyles(() => ({
    paper: {
        height: '100%'
    }
}));

const BarChart = ({ type, match, history }: IBarChartProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const [name, setName] = useState<string>('')
    const [chartData, setChartData] = useState<BarChartData[]>([])

    // for specific state or country stats
    const { isLoading, isError, data } = useQuery([type, name], fetchData, {
        enabled: name,
    })

    useEffect(() => {
        if (data) {
            const bars = createChartData(data, type)
            bars && setChartData(bars)
        }
    }, [data, type])

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

    if (isLoading) {
        return (
            <Skeleton variant="rect" width='100%' animation="wave" style={{ borderRadius: '5px' }}>
                <Chart />
            </Skeleton>
        )
    }

    if (isError) {
        return <span>Error</span>
    }

    // currently getting wierd problems with rendering chart and it not being that right size
    // possibly submit a bug ticket here if I can't figure it out
    // https://github.com/DevExpress/devextreme-react/issues/new/choose
    return (
        <Paper className={classes.paper}>
            <Chart
                id="chart"
                className={classes.paper}
                dataSource={chartData}
            >
                <Title text="Incident Rate Comparison" font={{ color: theme.palette.text.secondary }} />
                <LoadingIndicator enabled={true} />
                <CommonSeriesSettings
                    argumentField="rate"
                    type="bar"
                    hoverMode="allArgumentPoints"
                    selectionMode="allArgumentPoints"
                >
                    <Label visible={true}>
                        <Format type="fixedPoint" precision={0} />
                    </Label>
                </CommonSeriesSettings>
                <Margin right={15} left={15} />
                <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                <Series valueField='state_country' name={name} color={green[500]} />
                <Series valueField='us_world' name='us_world' color={amber[500]} />
            </Chart>
        </Paper>
    );
}

export default withRouter(BarChart);