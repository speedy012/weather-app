import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useQuery } from '@tanstack/react-query'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

export const useFetchDefaultLocation = (city: string) => {
  const fetchDefaultLocation = async (city: string) => {
    const repsonse = await axios.get(`${BASE_URL}/${city}?key=${apiKey}`)
    return repsonse?.data
  }

  return useQuery({
    queryKey: ['defaultLocation', city],
    queryFn: () => fetchDefaultLocation(city),
  })
}
