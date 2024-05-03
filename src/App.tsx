import './App.css'
import { Header } from './components/Header'
import { WeatherDayData, useFetchDefaultLocation } from './hooks/data/useLocation'
import { WeatherCard } from './components/WeatherCard'
import { useLocation } from './hooks/state/useLocation'
import Select from 'react-select'
import { Formik, Form } from 'formik'
import { useDates } from './hooks/state/useDates'
import dayjs from 'dayjs'

function App() {
  const { location } = useLocation()
  const { initialDate, setInitialDate, futureDate, setFutureDate } = useDates()

  const { data: defaultLocation } = useFetchDefaultLocation(location)

  if (!defaultLocation) return <div>Loading...</div>

  const defaultLocationOptions = defaultLocation.days.map((day) => {
    const date = dayjs(day.datetime).format('ddd MM-DD-YYYY')

    return { value: day.datetime, label: date }
  })

  const currDate = initialDate !== '' && defaultLocation.days.find((day) => day.datetime === initialDate)

  const pickedFutureDate = futureDate !== '' && defaultLocation.days.find((day) => day.datetime === futureDate)
  console.log({ initialDate })

  console.log({ currDate })

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col  container mx-auto px-4 py-8 h-auto gap-4">
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-6">
          <div className="md:w-1/2">
            <label htmlFor="current date">Current Date</label>
            <Formik
              initialValues={{ date: '' }}
              onSubmit={(values) => {
                setInitialDate(values.date)
              }}
            >
              {({ values, setFieldValue, handleChange, setFieldTouched, handleSubmit }) => (
                <Form className="flex items-center gap-2">
                  <Select
                    arial-label="date"
                    className="w-full"
                    value={defaultLocationOptions.find((option) => option.value === values.date)}
                    options={defaultLocationOptions}
                    onChange={(newValue) => {
                      handleChange(newValue?.value)
                      setFieldValue('date', newValue?.value)
                      handleSubmit()
                    }}
                    onBlur={() => {
                      setFieldTouched('date', true)
                    }}
                  />
                  <button type="submit" className="hidden">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="md:w-1/2">
            <label htmlFor="location">Future Date</label>
            <Formik
              initialValues={{ date: '' }}
              onSubmit={(values) => {
                setFutureDate(values.date)
              }}
            >
              {({ values, setFieldValue, handleChange, setFieldTouched, handleSubmit }) => (
                <Form className="flex items-center gap-2 ">
                  <Select
                    aria-label="future date picker"
                    className="w-full"
                    value={defaultLocationOptions.find((option) => option.value === values.date)}
                    options={defaultLocationOptions}
                    onChange={(newValue) => {
                      handleChange(newValue?.value)
                      setFieldValue('date', newValue?.value)
                      handleSubmit()
                    }}
                    onBlur={() => {
                      setFieldTouched('date', true)
                    }}
                  />
                  <button type="submit" className="hidden">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-6">
          <WeatherCard currDate={currDate as WeatherDayData} />
          <WeatherCard currDate={pickedFutureDate as WeatherDayData} />
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
          © 2024 Weather App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
