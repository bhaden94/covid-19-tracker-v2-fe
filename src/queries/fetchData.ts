export const fetchData = async (key: string, url: string) => {
    const data = await fetch(url)
    const json = await data.json()
    return json
}