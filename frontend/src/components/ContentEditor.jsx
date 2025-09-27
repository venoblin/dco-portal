import './ContentEditor.css'
import { useState, forwardRef, useImperativeHandle } from 'react'

const ContentEditor = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getContent: () => {},
    getEditorState: () => editorState
  }))

  return <div></div>
})

export default ContentEditor
