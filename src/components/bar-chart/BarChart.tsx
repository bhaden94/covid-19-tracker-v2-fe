import React, { useEffect, useState } from 'react';
import { deepOrange, green, red, amber } from '@material-ui/core/colors';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Legend,
    LoadingIndicator,
    Margin,
    Title,
    Grid,
    Label,
    Format
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

interface RouterProps {
    state: string
    country: string
}

interface IBarChartProps extends RouteComponentProps<RouterProps> {
    type: string,
}

const BarChart = ({ type, match, history }: IBarChartProps) => {
    const theme = useTheme();
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

    return (
        <Paper>
            <Chart
                dataSource={chartData}
            >
                <Title text="Data Over Time" font={{ color: theme.palette.text.secondary }} />
                <LoadingIndicator enabled={true} />
                <CommonSeriesSettings
                    argumentField="rate"
                    type='bar'
                >
                    <Label visible={true}>
                        <Format type="fixedPoint" precision={0} />
                    </Label>
                </CommonSeriesSettings>
                <Margin bottom={20} right={15} left={15} />
                <ArgumentAxis
                    aggregationInterval={{ weeks: 1 }}
                    valueMarginsEnabled={true}
                    argumentType='datetime'
                    discreteAxisDivisionMode="crossLabels"
                >
                    <Grid visible={false} />
                </ArgumentAxis>
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    itemTextPosition="bottom"
                />
                <Series argumentField="rate" valueField='state_country' name={name} color={green[500]} />
                <Series argumentField="rate" valueField='us_world' name='us_world' color={amber[500]} />
            </Chart>
        </Paper>
    );
}

export default withRouter(BarChart);