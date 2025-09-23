import './Panel.css'

const Panel = (props) => {
  const classes = `Panel ${props.className ? props.className : ''}`

  return <div className={classes}>{props.children}</div>
}

export default Panel
