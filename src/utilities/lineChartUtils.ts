export const createChartData = (data: any[], type: string) => {
    let builtStats: LineChartData[];
    if (type === 'state') {
        builtStats = buildStats(data, 'states')
    } else {
        builtStats = buildStats(data, 'countries')
    }
    return builtStats
}

const buildStats = (data: any[], type: string) => {
    let stats: LineChartData[] = [];

    for(let i=0; i<data.length;i+=1) {
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

    return stats
}

interface JSONData { 
    recovered: number,
    active: number, 
    confirmed: number,
    deaths: number
}

interface LineChartData {
	date: string;
	recovered: number;
	active: number;
	confirmed: number;
	deaths: number;
}
