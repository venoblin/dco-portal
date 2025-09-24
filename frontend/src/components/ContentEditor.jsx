import 'draft-js/dist/Draft.css'
import './ContentEditor.css'
import { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

const ContentEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const onToggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
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
        <button type="button" onClick={() => onToggleInlineStyle('BOLD')}>
          Bold
        </button>
        <button type="button" onClick={() => onToggleInlineStyle('ITALIC')}>
          Italic
        </button>
      </div>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  )
}

export default ContentEditor
