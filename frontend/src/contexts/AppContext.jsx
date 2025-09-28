import { createContext, useState } from 'react'
import useToggle from '../hooks/useToggle'
import Popup from '../components/Popup'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [isLoading, toggleIsLoading] = useToggle(false)
  const [popupMsg, setPopupMsg] = useState('')
  const [isPopup, toggleIsPopup] = useToggle(false)

  const popupToggle = (msg) => {
    setPopupMsg(msg)
    toggleIsPopup()
  }

  return (
    <AppContext.Provider value={{ popupToggle }}>
      {props.children}

      {isPopup === true && <Popup msg={popupMsg} onClose={popupToggle} />}
    </AppContext.Provider>
  )
}
