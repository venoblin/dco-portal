import 'draft-js/dist/Draft.css'
import { useState } from 'react'
import { Editor, EditorState } from 'draft-js'

const ContentEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const classes = `ContentEditor ${props.className ? props.className : ''}`

  return (
    <Editor
      className={classes}
      editorState={editorState}
      onChange={setEditorState}
    />
  )
}

export default ContentEditor
