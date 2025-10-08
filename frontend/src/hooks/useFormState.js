import { useState } from 'react'

const useFormState = (initial) => {
  const [state, setState] = useState(initial)

  const onChange = (event, callback) => {
    setState(event.target.value)

    if (callback) {
      callback(event.target.value)
    }
  }

  const resetState = () => {
    setState(initial)
  }

  return [state, onChange, setState, resetState]
}

export default useFormState
