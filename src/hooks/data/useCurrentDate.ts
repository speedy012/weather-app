import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useQuery } from '@tanstack/react-query'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

export const useFetchDate = (date: string) => {
  const fetchDate = async (date: string) => {
    const response = await axios.get(`${BASE_URL}/${date}?key=${apiKey}`)
    return response?.data
  }

  return useQuery({
    queryKey: ['currentDate', date],
    queryFn: () => fetchDate(date),
  })
}
