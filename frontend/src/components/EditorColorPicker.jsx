import './EditorColorPicker.css'
import editorStyleMap from '../utils/editorStyleMap'

const EditorColorPicker = (props) => {
  return (
    <div className="EditorColorPicker">
      {props.type === 'TEXT' &&
        Object.entries(editorStyleMap).map(
          ([key, value]) =>
            key.includes('TEXT') && (
              <button
                key={key + value.color}
                type="button"
                className="color"
                onMouseDown={() => props.onMouseDown(key)}
                style={{ background: value.color }}
              ></button>
            )
        )}

      {props.type === 'BACKGROUND' &&
        Object.entries(editorStyleMap).map(
          ([key, value]) =>
            key.includes('BACKGROUND') && (
              <button
                key={key + value.background}
                type="button"
                className="color"
                onMouseDown={() => props.onMouseDown(key)}
                style={{ background: value.background }}
              ></button>
            )
        )}
    </div>
  )
}

export default EditorColorPicker
