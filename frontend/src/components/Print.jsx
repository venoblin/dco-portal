import './Print.css'

const Print = (props) => {
  return (
    <div
      className={`Print${props.isHidden ? ' hidden' : ''}${
        props.isNoPadding ? ' no-padding' : ''
      }`}
    >
      {props.children}
    </div>
  )
}

export default Print
