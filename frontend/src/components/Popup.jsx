import './Popup.css'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const Popup = (props) => {
  const appContext = useContext(AppContext)

  const onClickHandler = () => {
    appContext.popupToggle()
  }

  return (
    <div className="Popup">
      <p>{props.msg ? props.msg : 'Something happened!'}</p>
      <button type="button" onClick={onClickHandler}>
        Ok
      </button>
    </div>
  )
}

export default Popup
