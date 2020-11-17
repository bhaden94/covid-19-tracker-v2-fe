export const createChartData = (data: any[], type: string, name: string): BarChartData[] => {
    if (type === 'state') {
        return buildStats(data, name, type, 'states')
    } else {
        return buildStats(data, name, type, 'countries')
    }
}

const buildStats = (data: any[], name: string, type: string, plural: string): BarChartData[] => {
    let chartData: BarChartData[] = [
        {
            rate: 'Incident Rate',
            state_country: 0,
            us_world: 2568
        },
        {
            rate: 'Mortality Rate',
            state_country: 0,
            us_world: 2.14,
        }
    ]
    const mostRecentEntry: any = data[data.length - 1][plural].find((entry: any) => {
        return entry[type] === name.toLowerCase()
    })

    chartData[0].state_country = parseFloat(mostRecentEntry?.incident_rate.toFixed(2))
    chartData[1].state_country = parseFloat(mostRecentEntry?.mortality_rate.toFixed(3))

    // find state average
    const averages = calculateAverages(data, plural)
    chartData[0].us_world = parseFloat(averages.avg_incident.toFixed(2))
    chartData[1].us_world = parseFloat(averages.avg_mortality.toFixed(3))

    return chartData
}

const calculateAverages = (data: any[], plural: string): { avg_incident: number, avg_mortality: number } => {
    const entryLength = data[data.length - 1][plural].length
    let avgIncidentRate: number = 0;
    let avgMortalityRate: number = 0;
    data[data.length - 1][plural].forEach((entry: any) => {
        avgIncidentRate += entry.incident_rate
        avgMortalityRate += entry.mortality_rate
    })
    return {
        avg_incident: avgIncidentRate /= entryLength,
        avg_mortality: avgMortalityRate /= entryLength
    }
}

export interface BarChartData {
    rate: string
    state_country: number
    us_world: number
}
