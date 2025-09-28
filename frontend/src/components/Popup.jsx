import './Popup.css'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const Popup = (props) => {
  const appContext = useContext(AppContext)

  const onClickHandler = () => {
    appContext.showPopup()
    document.body.style.overflow = 'initial'
  }

  return (
    <div className="Popup">
      <h2>{props.msg ? props.msg : 'Something happened!'}</h2>
      <button type="button" onClick={onClickHandler}>
        Ok
      </button>
    </div>
  )
}

export default Popup
