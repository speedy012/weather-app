import { useField, ErrorMessage } from 'formik'
import Select from 'react-select'

type SelectProps = {
  name: string
  options: { value: string; label: string }[]
}
export const FormSelect = ({ name, options }: SelectProps) => {
  const [field, , helpers] = useField(name)
  return (
    <>
      <Select
        name={name}
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        options={options}
        onBlur={() => helpers.setTouched(true)}
      />
      <ErrorMessage name={name} />
    </>
  )
}
