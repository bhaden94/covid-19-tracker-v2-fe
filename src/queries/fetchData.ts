export const fetchData = async (type: string, name?: string) => {
    if(name) {
        return await fetchSpecific(type, name)
    } else {
        return await fetchAllData(type)
    }
}

const fetchSpecific = async (type: string, name: string) => {
    // check if we are production build or not
    const url = process.env.NODE_ENV === 'production' ? 
        `${process.env.REACT_APP_BACKEND}/api/${type}?name=${name}` :
        `/api/${type}?name=${name}`

    const data = await fetch(url)
    const json = await data.json()
    return json
}

const fetchAllData = async (type: string) => {
    // check if we are production build or not
    const url = process.env.NODE_ENV === 'production' ? 
        `${process.env.REACT_APP_BACKEND}/api/${type}/all` :
        `/api/${type}/all`

    const data = await fetch(url)
    const json = await data.json()
    return json
}