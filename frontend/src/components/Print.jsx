import './Print.css'

const Print = (props) => {
  return (
    <div className={`Print${props.isHidden ? ' hidden' : ''}`}>
      {props.children}
    </div>
  )
}

export default Print
