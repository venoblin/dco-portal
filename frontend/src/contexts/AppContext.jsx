import { createContext, useEffect, useState } from 'react'
import { storageGet, storageRemove } from '../utils/localStorage'
import useToggle from '../hooks/useToggle'
import Popup from '../components/Popup'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const [popupOptions, setPopupOptions] = useState({ msg: '' })
  const [isPopup, setIsPopup] = useState(false)
  const authInitial = {
    isAuthenticated: false,
    credentials: null
  }
  const [auth, setAuth] = useState(authInitial)
  const navigate = useNavigate()

  const load = (promise) => {
    toggleIsLoading()

    return promise()
      .then((resonse) => {
        toggleIsLoading()

        return resonse
      })
      .catch((error) => {
        toggleIsLoading()

        throw new Error(error)
      })
  }

  const showPopup = (msg) => {
    document.body.style.overflow = 'hidden'
    if (typeof msg === 'string') {
      setPopupOptions({ ...popupOptions, msg: msg })
    } else {
      setPopupOptions({ ...msg })
    }

    setIsPopup(true)
  }

  const dismissPopup = () => {
    document.body.style.overflow = 'initial'
    setPopupOptions({ msg: '' })
    setIsPopup(false)
  }

  const checkToken = (options) => {
    const credentials = storageGet('credentials')

    if (credentials && Date.now() / 1000 < credentials.expiresAt) {
      setAuth({ isAuthenticated: true, credentials: credentials })
    } else {
      setAuth({ isAuthenticated: false, credentials: null })

      if (options && options.isCheckingExpired) {
        showPopup('Token expired please log in')
        navigate('/')
      }
    }
  }

  const logout = () => {
    storageRemove('credentials')
    setAuth(authInitial)
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <AppContext.Provider
      value={{
        showPopup,
        dismissPopup,
        isLoading,
        load,
        auth,
        setAuth,
        logout,
        checkToken
      }}
    >
      {isPopup === true && !isLoading && (
        <Popup options={popupOptions} showPopup={showPopup} />
      )}
      {props.children}
    </AppContext.Provider>
  )
}
