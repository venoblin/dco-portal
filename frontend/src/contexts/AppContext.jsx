import { createContext, useEffect, useState } from 'react'
import { storageGet } from '../utils/localStorage'
import useToggle from '../hooks/useToggle'
import Popup from '../components/Popup'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const [popupOptions, setPopupOptions] = useState({ msg: '' })
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

  const showPopup = (config) => {
    document.body.style.overflow = 'hidden'
    if (typeof config === 'string') {
      setPopupOptions({ ...popupOptions, msg: config })
    } else {
      setPopupOptions({ ...config })
    }

    setIsPopup(true)
  }

  const dismissPopup = () => {
    document.body.style.overflow = 'initial'
    setPopupOptions({ msg: '' })
    setIsPopup(false)
  }

  const checkToken = () => {
    const credentials = storageGet('credentials')

    if (credentials && Date.now() / 1000 < credentials.expiresAt) {
      setAuth({ isAuthenticated: true, credentials: credentials })
    } else {
      setAuth({ isAuthenticated: false, credentials: null })
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <AppContext.Provider
      value={{ showPopup, dismissPopup, isLoading, load, auth, setAuth }}
    >
      {isPopup === true && !isLoading && (
        <Popup options={popupOptions} showPopup={showPopup} />
      )}
      {props.children}
    </AppContext.Provider>
  )
}
