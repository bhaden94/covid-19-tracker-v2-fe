import React, { useEffect, useState } from 'react';
import { deepOrange, green, red, amber } from '@material-ui/core/colors';
import { Chart, LineSeries, ArgumentAxis, ValueAxis, ZoomAndPan, Tooltip, Legend  } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import { queryCache, useQuery } from 'react-query';
import { fetchData } from '../../queries/fetchData';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { State } from '../../utilities/StateObj';
import { Country } from '../../utilities/CountryObj';
import { ChartData, createChartData } from '../../utilities/chartUtils';
import { Paper } from '@material-ui/core';

interface RouterProps {
    state: string
    country: string
}

interface ILineChartProps extends RouteComponentProps<RouterProps> {
    type: string,
    single: boolean
}

const LineChart = ({ type, single, match, history }: ILineChartProps) => {
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

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error</span>
    }

    return (
        <Paper>
            <Chart
                data={chartData}
            >
                <ArgumentAxis />
                <ValueAxis />
                <Tooltip />
                <Legend />
                <LineSeries name="Confirmed" valueField="confirmed" argumentField="date" color={deepOrange[400]} />
                <LineSeries name="Active" valueField="active" argumentField="date" color={amber[600]} />
                <LineSeries name="Recovered" valueField="recovered" argumentField="date" color={green[500]} />
                <LineSeries name="Deaths" valueField="deaths" argumentField="date" color={red[500]} />
                <ZoomAndPan interactionWithArguments="both" interactionWithValues="both" />
            </Chart>
        </Paper>
    );
}

export default withRouter(LineChart);