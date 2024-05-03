import { useFetchDefaultLocation } from '../hooks/data/useLocation'
import { getWeatherIcon } from './WeatherIcons'
import wind from '../assets/wind.svg'
import rain from '../assets/rain.svg'
import locationIcon from '../assets/location.svg'
import { useLocation } from '../hooks/state/useLocation'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, ChartComponent } from 'chart.js/auto'
import { hours } from '../constants'
import dayjs from 'dayjs'

type DefaultLocationCardProps = {
  currDate: {
    icon: string
    conditions: string
    temp: number
    windspeed: number
    precip: number
    description: string
    datetimeEpoch: number
    datetime: string
  }
}

ChartJS.register({ id: 'line', component: Line as unknown as ChartComponent })

export const WeatherCard = ({ currDate }: DefaultLocationCardProps) => {
  const { location } = useLocation()
  const { data: currentLocation } = useFetchDefaultLocation(location)

  const { resolvedAddress, currentConditions, description } = currentLocation

  if (!currentLocation) return <div>Loading...</div>

  const secondCommaIndex = resolvedAddress.indexOf(',', resolvedAddress.indexOf(',') + 1)
  const result = resolvedAddress.slice(0, secondCommaIndex)

  const formattedcurrDate = dayjs(currDate.datetime).format('ddd MM-DD-YYYY')

  const formattedDefaultDate = dayjs(currentConditions.datetimeEpoch * 1000).format('ddd MM-DD-YYYY')

  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Temperature',
        data:
          currentLocation.days
            .find((day: { datetime: string }) => day.datetime === currDate.datetime)
            ?.hours.map((day: { temp: number }) => Math.round(day.temp)) ??
          currentLocation.days[0].hours.map((day: { temp: number }) => Math.round(day.temp)),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border shadow-sm bg-white p-6 md:w-1/2">
      <p className="text-sm font-medium text-gray-60 text-wrap text-center w-56">
        {formattedcurrDate ?? formattedDefaultDate}
      </p>
      <div className="flex items-center gap-3">
        <img src={locationIcon} alt="" className="h-12 w-12" />
        <p className="text-3xl font-bold text-gray-800">{result}</p>
      </div>
      <div className="flex gap-2">
        <img
          src={getWeatherIcon(currDate.icon ?? currentConditions.icon)}
          alt="weather icon"
          className="h-28 w-28 self-start"
        />
        <div className="mt-4">
          <p className="text-xl font-medium text-gray-800">{`${
            currDate.conditions ?? currentConditions.conditions
          } ${Math.round(currDate.temp ?? currentConditions.temp)}°F`}</p>
          <div className="flex gap-2 items-center">
            <img src={wind} alt="weather icon" className="h-6 w-6" />
            <p className="text-xl font-medium text-gray-600">{`${
              currDate.windspeed ?? currentConditions.windspeed
            } mph`}</p>
          </div>
          <div className="flex  items-center">
            <img src={rain} alt="" className="h-8 w-8" />
            <p className="text-xl font-medium text-gray-600">
              {currDate.precip === 0 ? 'No rain' : `${(currDate.precip ?? currentConditions.precip) * 100} %`}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-60 text-wrap text-center mt-2.5 w-56">
        {currDate.description ?? description}
      </p>

      <Line data={data} aria-label="hourly line chart of day picked" />
    </div>
  )
}
