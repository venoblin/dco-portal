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
      {props.options.msg && <h2>{props.options.msg}</h2>}

      {props.options.component && props.options.component}

      <button type="button" onClick={onClickHandler}>
        {props.options.dismissBtnText ? props.options.dismissBtnText : 'Ok'}
      </button>
    </div>
  )
}

export default Popup
