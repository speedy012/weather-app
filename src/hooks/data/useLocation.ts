import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useQuery } from '@tanstack/react-query'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

type PrecipType = null | string
type DataType = 'obs' | 'fcst' | 'comb'

export type WeatherHourData = {
  datetime: string
  datetimeEpoch: number
  temp: number
  feelslike: number
  humidity: number
  dew: number
  precip: number
  precipprob: number
  snow: number
  snowdepth: number
  preciptype: PrecipType
  windgust: number
  windspeed: number
  winddir: number
  pressure: number
  visibility: number
  cloudcover: number
  solarradiation: number
  solarenergy: number
  uvindex: number
  severerisk: number
  conditions: string
  icon: string
  stations?: string[] // Optional because it might be absent in forecast data
  source: DataType
}

export type WeatherDayData = {
  datetime: string
  datetimeEpoch: number
  tempmax: number
  tempmin: number
  temp: number
  feelslikemax: number
  feelslikemin: number
  feelslike: number
  dew: number
  humidity: number
  precip: number
  precipprob: number
  precipcover: number
  preciptype: PrecipType
  snow: number
  snowdepth: number
  windgust: number
  windspeed: number
  winddir: number
  pressure: number
  cloudcover: number
  visibility: number
  solarradiation: number
  solarenergy: number
  uvindex: number
  severerisk: number
  sunrise: string
  sunriseEpoch: number
  sunset: string
  sunsetEpoch: number
  moonphase: number
  conditions: string
  description: string
  icon: string
  stations?: string[]
  source: DataType
  hours: WeatherHourData[]
}

type WeatherStation = {
  distance: number
  latitude: number
  longitude: number
  useCount: number
  id: string
  name: string
  quality: number
  contribution: number
}

export type WeatherData = {
  queryCost: number
  latitude: number
  longitude: number
  resolvedAddress: string
  address: string
  timezone: string
  tzoffset: number
  description: string
  days: WeatherDayData[]
  alerts: any[]
  stations: { [key: string]: WeatherStation }
  currentConditions: WeatherHourData & {
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
  }
}

export const useFetchDefaultLocation = (city: string) => {
  const fetchDefaultLocation = async (city: string) => {
    const repsonse = await axios.get(`${BASE_URL}/${city}?key=${apiKey}`)

    return repsonse?.data as WeatherData
  }

  return useQuery({
    queryKey: ['defaultLocation', city],
    queryFn: () => fetchDefaultLocation(city),
  })
}
