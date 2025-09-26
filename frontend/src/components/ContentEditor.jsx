import 'draft-js/dist/Draft.css'
import './ContentEditor.css'
import { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import EditorBtn from './EditorBtn'

const ContentEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const styleMap = {
    TEXT_BLACK: {
      color: '#000000'
    },
    TEXT_RED: {
      color: '#D93025'
    },
    TEXT_BLUE: {
      color: '#1A73E8'
    },
    TEXT_GREEN: {
      color: '#188038'
    },
    TEXT_PURPLE: {
      color: '#673AB7'
    },
    TEXT_ORANGE: {
      color: '#F9AB00'
    },
    TEXT_AQUA: {
      color: '#00FFFF'
    },
    TEXT_FUCHSIA: {
      color: '#FF00FF'
    },
    TEXT_LIME: {
      color: '#00FF00'
    },
    TEXT_YELLOW: {
      color: '#FFD700'
    },
    TEXT_CRIMSON: {
      color: '#DC143C'
    },
    TEXT_GRAY_LIGHT: {
      color: '#9AA0A6'
    },
    TEXT_GRAY_DARK: {
      color: '#5F6368'
    },
    TEXT_BROWN: {
      color: '#795548'
    },
    TEXT_INDIGO: {
      color: '#3F51B5'
    },
    TEXT_WHITE: {
      color: '#FFFFFF'
    }
  }

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

          <EditorBtn
            btnFor="textColor"
            onClick={() => onToggleInlineStyle('TEXT_RED')}
          />
        </div>
      </div>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={styleMap}
      />
    </div>
  )
}

export default ContentEditor
