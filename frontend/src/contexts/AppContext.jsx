import { createContext, useState } from 'react'
import useToggle from '../hooks/useToggle'
import Popup from '../components/Popup'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const [popupMsg, setPopupMsg] = useState('')
  const [isPopup, setIsPopup] = useState(false)

  const popupToggle = (msg) => {
    setPopupMsg(msg)

    if (msg) {
      setIsPopup(true)
    } else {
      setIsPopup(false)
    }
  }

  return (
    <AppContext.Provider value={{ popupToggle }}>
      {isPopup === true && <Popup msg={popupMsg} popupToggle={popupToggle} />}
      {props.children}
    </AppContext.Provider>
  )
}
