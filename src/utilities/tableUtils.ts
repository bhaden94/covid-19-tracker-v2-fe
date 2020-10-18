export const daysChanged = (data: any, place: string, type: string, days: number): string => {
    let recent: number = 0;
    let old: number = 0;
    if (type === 'state') {
        recent = data[data.length - 1].states
            .filter((state: { state: string; }) => state.state === place.toLowerCase())[0]?.active
        old = data[data.length - days - 1].states
            .filter((state: { state: string; }) => state.state === place.toLowerCase())[0]?.active
    } else {
        recent = data[data.length - 1].countries
            .filter((country: { country: string; }) => country.country === place.toLowerCase())[0]?.active
        old = data[data.length - days - 1].countries
            .filter((country: { country: string; }) => country.country === place.toLowerCase())[0]?.active
    }
    const diff: number = recent - old
    // this makes sorting not work since it takes into consideration the commas
    // for example: 1,127 comes before(as in considered lower) than 900 because of the comma
    return diff.toLocaleString();
}