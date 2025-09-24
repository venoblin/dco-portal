import { useState } from 'react'

const useFormState = (initial) => {
  const [state, setState] = useState(initial)

  const onChange = (event) => {
    setState(event.target.value)
  }

  const resetState = () => {
    setState(initial)
  }

  return [state, onChange, resetState]
}

export default useFormState
