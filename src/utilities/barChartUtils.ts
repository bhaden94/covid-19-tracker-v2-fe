export const createChartData = (data: any, type: string): BarChartData[] => {
    return [
        {
            rate: 'Incident Rate',
            state_country: 1500,
            us_world: 2150,
        },
        // {
        //     rate: 'Mortality Rate',
        //     state_country: 2.50,
        //     us_world: 2.14,
        // }
    ]
}

export interface BarChartData {
    rate: string
    state_country: number
    us_world: number
}