import React, { useEffect, useState } from 'react';
import { deepOrange, green, red, amber } from '@material-ui/core/colors';
import {
    Chart,
    Series,
    ArgumentAxis,
    Aggregation,
    CommonSeriesSettings,
    Legend,
    LoadingIndicator,
    Margin,
    Title,
    Tooltip,
    Point,
    Grid,
    ZoomAndPan
} from 'devextreme-react/chart';
import { queryCache, useQuery } from 'react-query';
import { fetchData } from '../../queries/fetchData';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { State } from '../../utilities/StateObj';
import { Country } from '../../utilities/CountryObj';
import { ChartData, createChartData } from '../../utilities/chartUtils';
import { Paper } from '@material-ui/core';
import TooltipTemplate from './TooltipTemplate';
import useTheme from '@material-ui/core/styles/useTheme';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';

interface RouterProps {
    state: string
    country: string
}

interface ILineChartProps extends RouteComponentProps<RouterProps> {
    type: string,
    single: boolean
}

const LineChart = ({ type, single, match, history }: ILineChartProps) => {
    const theme = useTheme();
    const [name, setName] = useState<string>('')
    const [chartData, setChartData] = useState<ChartData[]>([])

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
            const lines = createChartData(data, type)
            lines && setChartData(lines)
        } else if (specificData?.data) {
            const lines = createChartData(specificData.data, type)
            lines && setChartData(lines)
        }
    }, [data, type, single, specificData])

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

    if (isLoading || specificData.isLoading) {
        return (
            <Skeleton variant="rect" width='100%' animation="wave" style={{borderRadius: '5px'}}>
                <Chart />
            </Skeleton>
        )
    }

    if (isError || specificData.isError) {
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
                    argumentField="date"
                    type='line'
                >
                    <Point visible={true} size='8' />
                    <Aggregation
                        enabled={true}
                        method="max"
                    />
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
                <Tooltip
                    enabled={true}
                    border={{ color: theme.palette.background.paper }}
                    cornerRadius='5'
                    color={theme.palette.background.paper}
                    contentRender={TooltipTemplate}
                />
                <ZoomAndPan argumentAxis="both" />
                <Series valueField='recovered' name='Recovered' color={green[500]} />
                <Series valueField='active' name='Active' color={amber[600]} />
                <Series valueField='confirmed' name='Confirmed' color={deepOrange[400]} />
                <Series valueField='deaths' name='Deaths' color={red[500]} />
            </Chart>
        </Paper>
    );
}

export default withRouter(LineChart);