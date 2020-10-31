export const averageRate = (data: any, rate: string, type: string) => {
    if(type === 'state') {
        return averageState(data, rate)
    } else {
        return averageCountry(data, rate)
    }
}

const averageState = (data: any, rate: string) => {
    let sum: number = 0;
    data[data.length - 1].states.forEach((state: any) => {
        sum += state[rate]
    });
    const average = sum / data[data.length - 1].states.length
    return Math.round(average * 100) / 100
}

const averageCountry = (data: any, rate: string) => {
    let sum: number = 0;
    data[data.length - 1].countries.forEach((country: any) => {
        sum += country[rate]
    });
    const average = sum / data[data.length - 1].countries.length
    return Math.round(average * 100) / 100
}