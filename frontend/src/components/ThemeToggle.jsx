import { useEffect } from 'react'
import useToggle from '../hooks/useToggle'
import './ThemeToggle.css'

const ThemeToggle = (props) => {
  const [isLightMode, toggleIsLightMode, setIsLightMode] = useToggle(false)

  const onChangeHandler = () => {
    if (props.currentTheme === 'light') {
      props.setTheme('dark')
    } else {
      props.setTheme('light')
    }

    toggleIsLightMode()
  }

  useEffect(() => {
    if (props.currentTheme === 'light') {
      setIsLightMode(true)
    }
  }, [props.currentTheme])

  return (
    <div className="ThemeToggle">
      <div className="toggle-switch">
        <label className="switch-label show">
          <input
            type="checkbox"
            className="checkbox"
            checked={isLightMode}
            onChange={onChangeHandler}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  )
}

export default ThemeToggle
