export const createChartData = (data: any[], type: string) => {
    let builtStats: ChartData[];
    if (type === 'state') {
        builtStats = buildStats(data, 'states')
    } else {
        builtStats = buildStats(data, 'countries')
    }
    return builtStats
}

const buildStats = (data: any[], type: string) => {
    let stats: ChartData[] = [];

    for(let i=0; i<data.length;i+=30) {
        const date = data[i].date
        let currentStats = {
            recovered: 0,
            active: 0,
            confirmed: 0,
            deaths: 0
        }
        // sums all the values needed for that day
        data[i][type].forEach((entry: JSONData) => {
            currentStats.recovered += entry.recovered
            currentStats.active += entry.active
            currentStats.confirmed += entry.confirmed
            currentStats.deaths += entry.deaths
        })
        // one object per date goes into stats
        stats.push({
            date: date,
            recovered: currentStats.recovered,
            active: currentStats.active,
            confirmed: currentStats.confirmed,
            deaths: currentStats.deaths
        })
    }

    // data.forEach((day: any) => {
    //     const date = day.date
    //     let currentStats = {
    //         recovered: 0,
    //         active: 0,
    //         confirmed: 0,
    //         deaths: 0
    //     }
    //     // sums all the values needed for that day
    //     day[type].forEach((entry: JSONData) => {
    //         currentStats.recovered += entry.recovered
    //         currentStats.active += entry.active
    //         currentStats.confirmed += entry.confirmed
    //         currentStats.deaths += entry.deaths
    //     })
    //     // one object per date goes into stats
    //     stats.push({
    //         date: date,
    //         recovered: currentStats.recovered,
    //         active: currentStats.active,
    //         confirmed: currentStats.confirmed,
    //         deaths: currentStats.deaths
    //     })
    // });

    return stats
}

interface JSONData { 
    recovered: number,
    active: number, 
    confirmed: number,
    deaths: number
}

export interface ChartData {
    date: string,
    recovered: number,
    active: number,
    confirmed: number,
    deaths: number
}

// import { ResponsiveLine } from '@nivo/line'
// // make sure parent container have a defined height when using
// // responsive component, otherwise height will be 0 and
// // no chart will be rendered.
// // website examples showcase many properties,
// // you'll often use just a few of them.
// const MyResponsiveLine = ({ data /* see data tab */ }) => (
//     <ResponsiveLine
//         data={data}
//         margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
//         xScale={{ type: 'linear' }}
//         yScale={{ type: 'linear', stacked: true, min: 0, max: 2500 }}
//         yFormat=" >-.2f"
//         curve="monotoneX"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickValues: [
//                 0,
//                 20,
//                 40,
//                 60,
//                 80,
//                 100,
//                 120
//             ],
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             format: '.2f',
//             legend: 'price',
//             legendOffset: 36,
//             legendPosition: 'middle'
//         }}
//         axisLeft={{
//             tickValues: [
//                 0,
//                 500,
//                 1000,
//                 1500,
//                 2000,
//                 2500
//             ],
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             format: '.2s',
//             legend: 'volume',
//             legendOffset: -40,
//             legendPosition: 'middle'
//         }}
//         enableGridX={false}
//         colors={{ scheme: 'spectral' }}
//         lineWidth={1}
//         pointSize={4}
//         pointColor={{ theme: 'background' }}
//         pointBorderWidth={1}
//         pointBorderColor={{ from: 'serieColor' }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         gridXValues={[ 0, 20, 40, 60, 80, 100, 120 ]}
//         gridYValues={[ 0, 500, 1000, 1500, 2000, 2500 ]}
//         legends={[
//             {
//                 anchor: 'bottom-right',
//                 direction: 'column',
//                 justify: false,
//                 translateX: 140,
//                 translateY: 0,
//                 itemsSpacing: 2,
//                 itemDirection: 'left-to-right',
//                 itemWidth: 80,
//                 itemHeight: 12,
//                 itemOpacity: 0.75,
//                 symbolSize: 12,
//                 symbolShape: 'circle',
//                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                 effects: [
//                     {
//                         on: 'hover',
//                         style: {
//                             itemBackground: 'rgba(0, 0, 0, .03)',
//                             itemOpacity: 1
//                         }
//                     }
//                 ]
//             }
//         ]}
//     />
// )


// const MyResponsiveLine = ({ data /* see data tab */ }) => (
//     <ResponsiveLine
//         data={data}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: 'point' }}
//         yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
//         yFormat=" >-.2f"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             orient: 'bottom',
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'transportation',
//             legendOffset: 36,
//             legendPosition: 'middle'
//         }}
//         axisLeft={{
//             orient: 'left',
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'count',
//             legendOffset: -40,
//             legendPosition: 'middle'
//         }}
//         pointSize={10}
//         pointColor={{ theme: 'background' }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: 'serieColor' }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//             {
//                 anchor: 'bottom-right',
//                 direction: 'column',
//                 justify: false,
//                 translateX: 100,
//                 translateY: 0,
//                 itemsSpacing: 0,
//                 itemDirection: 'left-to-right',
//                 itemWidth: 80,
//                 itemHeight: 20,
//                 itemOpacity: 0.75,
//                 symbolSize: 12,
//                 symbolShape: 'circle',
//                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                 effects: [
//                     {
//                         on: 'hover',
//                         style: {
//                             itemBackground: 'rgba(0, 0, 0, .03)',
//                             itemOpacity: 1
//                         }
//                     }
//                 ]
//             }
//         ]}
//     />
// )