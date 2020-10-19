import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import { deepOrange, green, red, amber, grey } from '@material-ui/core/colors';
import useTheme from '@material-ui/core/styles/useTheme';

const data = [
    {
        "id": "recovered",
        "color": deepOrange[500],
        "data": [
            {
                "x": "plane",
                "y": 161
            },
            {
                "x": "helicopter",
                "y": 173
            },
            {
                "x": "boat",
                "y": 268
            },
            {
                "x": "train",
                "y": 284
            },
            {
                "x": "subway",
                "y": 292
            },
            {
                "x": "bus",
                "y": 260
            },
            {
                "x": "car",
                "y": 273
            },
            {
                "x": "moto",
                "y": 270
            },
            {
                "x": "bicycle",
                "y": 226
            },
            {
                "x": "horse",
                "y": 43
            },
            {
                "x": "skateboard",
                "y": 258
            },
            {
                "x": "others",
                "y": 88
            }
        ]
    },
    {
        "id": "active",
        "color": "hsl(328, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 147
            },
            {
                "x": "helicopter",
                "y": 216
            },
            {
                "x": "boat",
                "y": 270
            },
            {
                "x": "train",
                "y": 181
            },
            {
                "x": "subway",
                "y": 103
            },
            {
                "x": "bus",
                "y": 26
            },
            {
                "x": "car",
                "y": 149
            },
            {
                "x": "moto",
                "y": 37
            },
            {
                "x": "bicycle",
                "y": 109
            },
            {
                "x": "horse",
                "y": 141
            },
            {
                "x": "skateboard",
                "y": 171
            },
            {
                "x": "others",
                "y": 278
            }
        ]
    },
    {
        "id": "confirmed",
        "color": "hsl(36, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 148
            },
            {
                "x": "helicopter",
                "y": 293
            },
            {
                "x": "boat",
                "y": 281
            },
            {
                "x": "train",
                "y": 150
            },
            {
                "x": "subway",
                "y": 189
            },
            {
                "x": "bus",
                "y": 197
            },
            {
                "x": "car",
                "y": 129
            },
            {
                "x": "moto",
                "y": 28
            },
            {
                "x": "bicycle",
                "y": 263
            },
            {
                "x": "horse",
                "y": 267
            },
            {
                "x": "skateboard",
                "y": 0
            },
            {
                "x": "others",
                "y": 262
            }
        ]
    },
    {
        "id": "deaths",
        "color": "hsl(90, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 278
            },
            {
                "x": "helicopter",
                "y": 30
            },
            {
                "x": "boat",
                "y": 223
            },
            {
                "x": "train",
                "y": 118
            },
            {
                "x": "subway",
                "y": 133
            },
            {
                "x": "bus",
                "y": 109
            },
            {
                "x": "car",
                "y": 77
            },
            {
                "x": "moto",
                "y": 53
            },
            {
                "x": "bicycle",
                "y": 80
            },
            {
                "x": "horse",
                "y": 243
            },
            {
                "x": "skateboard",
                "y": 33
            },
            {
                "x": "others",
                "y": 163
            }
        ]
    }
]

interface ILineChartProps {
    type: string,
    single: boolean
}

const LineChart = ({ type, single }: ILineChartProps) => {
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

    return (
        <div style={{ height: '50%' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 40, bottom: 55, left: 55 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
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
                useMesh={true}
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

export default LineChart;