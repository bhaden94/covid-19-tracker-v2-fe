export const createStats = (data: any, location: string) => {
    let builtStats;
    if(location === '/api/state/all') {
        builtStats = buildState(data)
    } else {
        builtStats = buildCountry(data)
    }
    return builtStats
}

const buildCountry = (data: any) => {
    let confirmed = 0;
    let active = 0;
    let recovered = 0;
    let deaths = 0;

    data.forEach((entry: any) => {
        entry.countries.forEach((country: any) => {
            confirmed += country.confirmed
            active += country.active
            recovered += country.recovered
            deaths += country.deaths
        })
    })
    return {
        confirmed: confirmed,
        active: active,
        recovered: recovered,
        deaths: deaths
    }
}

const buildState = (data: any) => {
    let confirmed = 0;
    let active = 0;
    let recovered = 0;
    let deaths = 0;

    data.forEach((entry: any) => {
        entry.states.forEach((state: any) => {
            confirmed += state.confirmed
            active += state.active
            recovered += state.recovered
            deaths += state.deaths
        })
    })
    return {
        confirmed: confirmed,
        active: active,
        recovered: recovered,
        deaths: deaths
    }
}

export const abbreviateNumber = (num: any, fixed: number) => {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
}
