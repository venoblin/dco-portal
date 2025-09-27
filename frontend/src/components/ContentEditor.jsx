import './ContentEditor.css'
import { useState, forwardRef, useImperativeHandle } from 'react'

const ContentEditor = forwardRef((props, ref) => {
  const [content, setContent] = useState('')

  useImperativeHandle(ref, () => ({
    getContent: () => {},
    getEditorState: () => editorState
  }))

  return <div className="ContentEditor"></div>
})

export default ContentEditor
