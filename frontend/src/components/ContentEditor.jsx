import 'draft-js/dist/Draft.css'
import './ContentEditor.css'
import { useState } from 'react'
import { Editor, EditorState } from 'draft-js'

const ContentEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  return <Editor editorState={editorState} onChange={setEditorState} />
}

export default ContentEditor
