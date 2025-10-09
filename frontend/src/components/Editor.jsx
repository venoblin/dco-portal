import './Editor.css'
import { useRef, useEffect } from 'react'
import Quill from 'quill'
const Delta = Quill.import('delta')

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
    import('quill').then(({ default: Quill }) => {
      if (editorRef.current && props.quillInstance === null) {
        const editor = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: 'Enter content...',
          modules: {
            toolbar: toolbarOptions
          }
        })

        props.setQuillInstance(editor)

        editor.on('text-change', () => {
          props.setContent(editor.root.innerHTML)
        })
      }
    })
  }, [props.quillInstance, editorRef])

  useEffect(() => {
    if (props.quillInstance && props.content) {
      props.quillInstance.clipboard.dangerouslyPasteHTML(props.content)
    }
  }, [props.quillInstance, props.content])

  return (
    <div className="Editor">
      <div className="editor-container">
        <div ref={editorRef}></div>
      </div>
    </div>
  )
}

export default Editor
