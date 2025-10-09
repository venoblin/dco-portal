import './Editor.css'
import { useRef, useEffect } from 'react'
import Quill from 'quill'

const Editor = (props) => {
  const editorRef = useRef(null)

  const toolbarOptions = [
    [
      { header: [1, 2, 3, 4, 5, 6, false] },
      { size: ['small', false, 'large', 'huge'] }
    ],

    [
      'bold',
      'italic',
      'underline',
      'strike',
      { color: [] },
      { background: [] }
    ],

    ['link', 'image', 'video', 'formula', 'blockquote', 'code-block'],

    [{ align: [] }, { direction: 'rtl' }, { indent: '-1' }, { indent: '+1' }],

    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

    [{ script: 'sub' }, { script: 'super' }],

    ['clean']
  ]

  useEffect(() => {
    if (editorRef.current && !props.quillInstance) {
      const editor = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Enter content...',
        modules: {
          toolbar: toolbarOptions
        }
      })

      props.setQuillInstance(editor)

      if (props.content) {
        editor.root.innerHTML = props.content
      }

      editor.on('text-change', () => {
        props.setContent(editor.root.innerHTML)
      })
    }
  }, [props.quillInstance])

  return (
    <div className="Editor">
      <div className="editor-container">
        <div ref={editorRef}></div>
      </div>
    </div>
  )
}

export default Editor
