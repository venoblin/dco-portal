import 'draft-js/dist/Draft.css'
import './ContentEditor.css'
import { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import editorStyleMap from '../utils/editorStyleMap'
import useToggle from '../hooks/useToggle'
import EditorBtn from './EditorBtn'
import EditorColorPicker from './EditorColorPicker'

const ContentEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [isTextColorPicker, toggleIsTextColorPicker] = useToggle(false)
  const [isBgColorPicker, toggleIsBgColorPicker] = useToggle(false)
  const textColorPickerRef = useRef()
  const bgColorPickerRef = useRef()

  const onToggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const onToggleBlockStyle = (blockStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle))
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const isStyleActive = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle()
    return currentStyle.has(style)
  }

  const addColor = (colorKey) => {
    onToggleInlineStyle(colorKey)

    if (isTextColorPicker) {
      toggleIsTextColorPicker()
    } else if (isBgColorPicker) {
      toggleIsBgColorPicker()
    }
  }

  const toggleColorPicker = (type) => {
    if (!isTextColorPicker || !isBgColorPicker) {
      switch (type) {
        case 'TEXT':
          toggleIsTextColorPicker()

          if (isBgColorPicker) toggleIsBgColorPicker()
          break
        case 'BACKGROUND':
          toggleIsBgColorPicker()
          if (isTextColorPicker) toggleIsTextColorPicker()
          break
      }
    }
  }

  const handleWindowClick = (event) => {
    const target = event.target
    const isTextColor = textColorPickerRef.current.contains(target)
    const isBgColor = bgColorPickerRef.current.contains(target)

    if (!isTextColor && isTextColorPicker) {
      toggleIsTextColorPicker()
    } else if (!isBgColor && isBgColorPicker) {
      toggleIsBgColorPicker()
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [handleWindowClick])

  return (
    <div className="ContentEditor">
      <div className="toolbar">
        <div className="btns-wrap">
          <EditorBtn
            className={isStyleActive('BOLD') ? 'active' : ''}
            btnFor="BOLD"
            onMouseDown={() => onToggleInlineStyle('BOLD')}
          />

          <EditorBtn
            className={isStyleActive('ITALIC') ? 'active' : ''}
            btnFor="ITALIC"
            onMouseDown={() => onToggleInlineStyle('ITALIC')}
          />

          <EditorBtn
            className={isStyleActive('UNDERLINE') ? 'active' : ''}
            btnFor="UNDERLINE"
            onMouseDown={() => onToggleInlineStyle('UNDERLINE')}
          />

          <EditorBtn
            className={isStyleActive('STRIKETHROUGH') ? 'active' : ''}
            btnFor="STRIKETHROUGH"
            onMouseDown={() => onToggleInlineStyle('STRIKETHROUGH')}
          />

          <div className="color-picker" ref={textColorPickerRef}>
            <EditorBtn
              btnFor="TEXT_COLOR"
              onMouseDown={() => toggleColorPicker('TEXT')}
            />

            {isTextColorPicker === true && (
              <EditorColorPicker type="TEXT" onMouseDown={addColor} />
            )}
          </div>

          <div className="color-picker" ref={bgColorPickerRef}>
            <EditorBtn
              btnFor="BACKGROUND"
              onMouseDown={() => toggleColorPicker('BACKGROUND')}
            />

            {isBgColorPicker === true && (
              <EditorColorPicker type="BACKGROUND" onMouseDown={addColor} />
            )}
          </div>
        </div>
      </div>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={editorStyleMap}
      />
    </div>
  )
}

export default ContentEditor
