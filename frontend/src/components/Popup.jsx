import './Popup.css'

const Popup = (props) => {
  const onClickHandler = () => {}

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
