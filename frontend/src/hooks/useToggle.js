import { useState } from 'react'

const useToggle = (initial = false) => {
  const [state, setState] = useState(initial)

  const toggle = () => {
    setState((currentState) => !currentState)
  }

  return [state, toggle, setState]
}

export default useToggle
