import 'draft-js/dist/Draft.css'
import './ContentEditor.css'
import { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import editorStyleMaps from '../utils/editorStyleMaps'
import useToggle from '../hooks/useToggle'
import EditorBtn from './EditorBtn'
import EditorColorPicker from './EditorColorPicker'

const ContentEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [isTextColorPicker, toggleIsTextColorPicker] = useToggle(false)
  const textColorPickerRef = useRef()
  const [isBgColorPicker, toggleIsBgColorPicker] = useToggle(false)

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
    if (isTextColorPicker || isBgColorPicker) {
      const target = event.target
      const isColorPicker = textColorPickerRef.current.contains(target)

      if (!isColorPicker) {
        toggleIsTextColorPicker()
      }
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
            btnFor="bold"
            onClick={() => onToggleInlineStyle('BOLD')}
          />

          <EditorBtn
            btnFor="italic"
            onClick={() => onToggleInlineStyle('ITALIC')}
          />

          <EditorBtn
            btnFor="underline"
            onClick={() => onToggleInlineStyle('UNDERLINE')}
          />

          <EditorBtn
            btnFor="strikethrough"
            onClick={() => onToggleInlineStyle('STRIKETHROUGH')}
          />

          <div className="color-picker" ref={textColorPickerRef}>
            <EditorBtn
              btnFor="textColor"
              onClick={() => toggleColorPicker('TEXT')}
            />

            {isTextColorPicker === true && <EditorColorPicker />}
          </div>
        </div>
      </div>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={editorStyleMaps}
      />
    </div>
  )
}

export default ContentEditor
