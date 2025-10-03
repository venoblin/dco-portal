import { createContext, useEffect, useState } from 'react'
import { storageGet } from '../utils/localStorage'
import useToggle from '../hooks/useToggle'
import Popup from '../components/Popup'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const [popupMsg, setPopupMsg] = useState('')
  const [isPopup, setIsPopup] = useState(false)
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    credentials: null
  })

  const load = (promise) => {
    toggleIsLoading()

    return promise()
      .then((res) => {
        toggleIsLoading()

        return res
      })
      .catch((err) => {
        toggleIsLoading()

        showPopup(<p>{err.message}</p>)
      })
  }

  const showPopup = (msg) => {
    document.body.style.overflow = 'hidden'
    setPopupMsg(msg)

    if (msg) {
      setIsPopup(true)
    } else {
      setIsPopup(false)
    }
  }

  const checkToken = () => {
    const credentials = storageGet('credentials')

    if (credentials) {
      setAuth({ isAuthenticated: true, credentials: credentials })
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <AppContext.Provider value={{ showPopup, isLoading, load, auth, setAuth }}>
      {isPopup === true && !isLoading && (
        <Popup msg={popupMsg} showPopup={showPopup} />
      )}
      {props.children}
    </AppContext.Provider>
  )
}
