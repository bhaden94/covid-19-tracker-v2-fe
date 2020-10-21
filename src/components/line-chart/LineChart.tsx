import React, { useEffect, useState } from 'react';
import { ResponsiveLineCanvas } from '@nivo/line'
import { deepOrange, green, red, amber, grey } from '@material-ui/core/colors';
import useTheme from '@material-ui/core/styles/useTheme';
import { queryCache, useQuery } from 'react-query';
import { fetchData } from '../../queries/fetchData';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { State } from '../../utilities/StateObj';
import { Country } from '../../utilities/CountryObj';
import { ChartData, createChartData } from '../../utilities/chartUtils';

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

    const chartTheme: any = {
        axis: {
            ticks: {
                text: {
                    fill: theme.palette.type === 'light' ? grey[800] : grey[200]
                }
            }
        }
    }
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

    console.log(chartData)

    return (
        <div style={{ height: '400px' }}>
            <ResponsiveLineCanvas
                data={chartData}
                margin={{ top: 50, right: 40, bottom: 55, left: 70 }}
                xScale={{ type: "time", format: "%Y-%m-%d" }}
                xFormat="time:%Y-%m-%d"
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: "%b %Y",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                colors={[green[500], amber[600], deepOrange[400], red[500]]}
                enablePoints={false}
                enableGridX={false}
                
                theme={chartTheme}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        justify: false,
                        translateX: 15,
                        translateY: 4,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 65,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
}

export default withRouter(LineChart);