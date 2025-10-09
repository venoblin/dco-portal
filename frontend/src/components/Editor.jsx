import './Editor.css'
import { useRef, useEffect } from 'react'

const Editor = () => {
  const editorRef = useRef(null)
  const [quillInstance, setQuillInstance] = useState(null)

  const toolbarOptions = [
    [
      { header: [2, 3, 4, 5, 6, false] },
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
    if (editorRef.current && !quillInstance) {
      const editor = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Enter content...',
        modules: {
          toolbar: toolbarOptions
        }
      })

      setQuillInstance(editor)

      editor.on('text-change', () => {
        props.setContent(editor.root.innerHTML)
      })
    }
  }, [quillInstance])

  return (
    <div className="Editor">
      <div className="editor-container">
        <div ref={editorRef}></div>
      </div>
    </div>
  )
}

export default Editor
