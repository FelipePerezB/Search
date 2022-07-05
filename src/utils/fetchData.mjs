export const fetchData = async (API, options) => {
    const response = await fetch(API, options)
    const data = await response.json()
    return data
}