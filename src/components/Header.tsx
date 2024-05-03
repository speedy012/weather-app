import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import logo from '../assets/weather-app-logo.svg'
import { useLocation } from '../hooks/state/useLocation'

const validationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
})
export const Header = () => {
  const { setLocation } = useLocation()

  return (
    <header className="flex justify-between px-2 py-4 md:px-6 md:py-4 bg-white w-full">
      <div className="flex items-center">
        <img src={logo} className="h-9 w-9" alt="" />

        <p className="text-xl font-bold">Weather App</p>
      </div>

      <Formik
        initialValues={{ city: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLocation(values.city)
        }}
      >
        <Form className="flex items-center gap-2">
          <Field
            as="input"
            type="text"
            name="city"
            placeholder="New York, NY"
            className="border-2 border-gray-300 bg-gray-100 rounded-md p-1.5 w-36"
          />
        </Form>
      </Formik>
    </header>
  )
}
