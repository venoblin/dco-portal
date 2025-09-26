import 'draft-js/dist/Draft.css'
import './ContentEditor.css'
import { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import EditorBtn from './EditorBtn'

const ContentEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

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
          <EditorBtn btnFor="bold" onClick={() => onToggleInlineStyle('BOLD')}>
            Bold
          </EditorBtn>
          <EditorBtn
            btnFor="italic"
            onClick={() => onToggleInlineStyle('ITALIC')}
          >
            Italic
          </EditorBtn>
          <EditorBtn
            btnFor="underline"
            onClick={() => onToggleInlineStyle('UNDERLINE')}
          >
            Underline
          </EditorBtn>
          <EditorBtn
            btnFor="strikethrough"
            onClick={() => onToggleInlineStyle('STRIKETHROUGH')}
          >
            Strikethrough
          </EditorBtn>
        </div>

        <div className="btns-wrap"></div>
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
