import { useState } from 'react'

function useFormState(initialVal) {
  const [formData, setFormData] = useState(initialVal)
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return [formData, handleChange]
}

export default useFormState
