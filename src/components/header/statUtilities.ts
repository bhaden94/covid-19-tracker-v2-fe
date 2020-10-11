export const createStats = (data: any, location: string) => {
    let builtStats;
    if(location.indexOf('united_states') !== -1) {
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
