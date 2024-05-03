import './App.css'
import { Header } from './components/Header'
import { useFetchDefaultLocation } from './hooks/data/useLocation'
import { WeatherCard } from './components/WeatherCard'
import { useLocation } from './hooks/state/useLocation'
import Select from 'react-select'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useDates } from './hooks/state/useDates'
import dayjs from 'dayjs'

const validationSchema = Yup.object().shape({
  data: Yup.string().required('date is required'),
})

function App() {
  const { location } = useLocation()
  const { initialDate, setInitialDate, futureDate, setFutureDate } = useDates()

  const { data: defaultLocation } = useFetchDefaultLocation(location)

  if (!defaultLocation) return <div>Loading...</div>

  const defaultLocationOptions = defaultLocation.days.map((day: { datetime: string; datetimeEpoch: number }) => {
    const date = dayjs(day.datetime).format('ddd MM-DD-YYYY')

    return { value: day.datetime, label: date }
  })

  const currDate =
    initialDate !== '' && defaultLocation.days.find((day: { datetime: string }) => day.datetime === initialDate.value)

  const pickedFutureDate =
    futureDate !== '' && defaultLocation.days.find((day: { datetime: string }) => day.datetime === futureDate.value)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col  container mx-auto px-4 py-8 h-auto gap-4">
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-6">
          <div className="md:w-1/2">
            <label htmlFor="current date">Current Date</label>

            <Formik
              initialValues={{ date: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log({ values })
              }}
            >
              <Form className="flex items-center gap-2">
                <Select
                  aria-labelledby="current date picker"
                  className="w-full"
                  defaultValue={initialDate}
                  options={defaultLocationOptions}
                  onChange={(newValue) => {
                    setInitialDate(newValue ?? '')
                  }}
                />
              </Form>
            </Formik>
          </div>
          <div className="md:w-1/2">
            <label htmlFor="future date">Future Date</label>
            <Formik
              initialValues={{ date: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log({ values })
              }}
            >
              <Form className="flex items-center gap-2">
                <Select
                  aria-label="future date picker"
                  className="w-full"
                  defaultValue={futureDate}
                  options={defaultLocationOptions}
                  onChange={(newValue) => {
                    setFutureDate(newValue ?? '')
                  }}
                />
              </Form>
            </Formik>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-6">
          <WeatherCard currDate={currDate} />
          <WeatherCard currDate={pickedFutureDate} />
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
