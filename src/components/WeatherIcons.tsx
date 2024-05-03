import clearDay from '../assets/icons/clear-day.svg'
import clearNight from '../assets/icons/clear-night.svg'
import cloudy from '../assets/icons/cloudy.svg'
import fog from '../assets/icons/fog.svg'
import hail from '../assets/icons/hail.svg'
import partlyCloudyDay from '../assets/icons/partly-cloudy-day.svg'
import partlyCloudyNight from '../assets/icons/partly-cloudy-night.svg'
import rainSnowShowersDay from '../assets/icons/rain-snow-showers-day.svg'
import rainSnowShowersNight from '../assets/icons/rain-snow-showers-night.svg'
import rainSnow from '../assets/icons/rain-snow.svg'
import rain from '../assets/icons/rain.svg'
import showersDay from '../assets/icons/showers-day.svg'
import showersNight from '../assets/icons/showers-night.svg'
import sleet from '../assets/icons/sleet.svg'
import snowShowersDay from '../assets/icons/snow-showers-day.svg'
import snowShowersNight from '../assets/icons/snow-showers-night.svg'
import snow from '../assets/icons/snow.svg'
import thunderRain from '../assets/icons/thunder-rain.svg'
import thunderShowersDay from '../assets/icons/thunder-showers-day.svg'
import thunderShowersNight from '../assets/icons/thunder-showers-night.svg'
import thunder from '../assets/icons/thunder.svg'
import wind from '../assets/icons/wind.svg'

export const weatherIconMap = {
  'clear-day': clearDay,
  'clear-night': clearNight,
  cloudy,
  fog,
  hail,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  'rain-snow-showers-day': rainSnowShowersDay,
  'rain-snow-showers-night': rainSnowShowersNight,
  'rain-snow': rainSnow,
  rain,
  'showers-day': showersDay,
  'showers-night': showersNight,
  sleet,
  'snow-showers-day': snowShowersDay,
  'snow-showers-night': snowShowersNight,
  snow,
  'thunder-rain': thunderRain,
  'thunder-showers-day': thunderShowersDay,
  'thunder-showers-night': thunderShowersNight,
  thunder,
  wind,
}

export const getWeatherIcon = (icon: string) => {
  return weatherIconMap[icon as keyof typeof weatherIconMap]
}
