import type { ApiResponse } from '../common/models'

const ApiService = {
  getData: async (date: any): Promise<ApiResponse> => {
    const latitude = 40.71427
    const longitude = -74.00597
    const baseUrl = "https://api.sunrisesunset.io/json"

    try {
      const formattedDate = new Date(date).toISOString().split('T')[0]
      const url = `${baseUrl}?lat=${latitude}&lng=${longitude}&date=${formattedDate}`
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('The following error occurred while fetching the data: ', error)
    }
  }
}

export default ApiService
