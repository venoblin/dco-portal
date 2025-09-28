import { createContext, useState } from 'react'
import useToggle from '../hooks/useToggle'
import Popup from '../components/Popup'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const [popupMsg, setPopupMsg] = useState('')
  const [isPopup, setIsPopup] = useState(false)

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

  return (
    <AppContext.Provider value={{ showPopup, isLoading, load }}>
      {isPopup === true && !isLoading && (
        <Popup msg={popupMsg} showPopup={showPopup} />
      )}
      {props.children}
    </AppContext.Provider>
  )
}
