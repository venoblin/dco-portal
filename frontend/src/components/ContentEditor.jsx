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
  const INLINE_TYPES = ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH']
  const BLOCK_TYPES = [
    'unordered-list-item',
    'ordered-list-item',
    'blockquote',
    'code-block'
  ]

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

  const handleFontSizeChange = (event) => {
    onToggleBlockStyle(event.target.value)
  }

  const getActiveBlockType = () => {
    const selection = editorState.getSelection()

    const contentState = editorState.getCurrentContent()
    const block = contentState.getBlockForKey(selection.getStartKey())

    return block.getType()
  }
  const isInlineStyleActive = (style) => {
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
          <select value={getActiveBlockType()} onChange={handleFontSizeChange}>
            <option value="header-one">Header 1</option>
            <option value="header-two">Header 2</option>
            <option value="header-three">Header 3</option>
            <option value="paragraph">Normal</option>
          </select>
        </div>

        <div className="btns-wrap">
          {INLINE_TYPES.map((stlye) => (
            <EditorBtn
              key={stlye}
              className={isInlineStyleActive(stlye) ? 'active' : ''}
              btnFor={stlye}
              onMouseDown={() => onToggleInlineStyle(stlye)}
            />
          ))}

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

        <div className="btns-wrap">
          {BLOCK_TYPES.map((style) => (
            <EditorBtn
              key={style}
              className={isInlineStyleActive(style) ? 'active' : ''}
              btnFor={style.replaceAll('-', '_')}
              onMouseDown={() => onToggleBlockStyle(style)}
            />
          ))}
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
