import { useState } from 'react'

const useToggle = (initial = false) => {
  const [state, setState] = useState(initial)

  const toggle = () => {
    setState((currentState) => !currentState)
  }

  const resetState = () => {
    setState(initial)
  }

  return [state, toggle, setState, resetState]
}

export default useToggle
