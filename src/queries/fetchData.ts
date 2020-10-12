export const fetchData = async (type: string, name?: string) => {
    if(name) {
        return await fetchSpecific(type, name)
    } else {
        return await fetchAllData(type)
    }
}

const fetchSpecific = async (type: string, name: string) => {
    const data = await fetch(`/api/${type}?name=${name}`)
    const json = await data.json()
    return json
}

const fetchAllData = async (type: string) => {
    const data = await fetch(`/api/${type}/all`)
    const json = await data.json()
    return json
}