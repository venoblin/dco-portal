import './Editor.css'
import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill-new'

const Editor = (props) => {
  const quillRef = useRef()

  const modules = {
    toolbar: [
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
  }

  useEffect(() => {
    if (quillRef.current && props.setQuillInstance) {
      const editor = quillRef.current.getEditor()

      const unprivilegedEditor = quillRef.current.makeUnprivilegedEditor(editor)

      props.setQuillInstance(unprivilegedEditor)
    }
  }, [])

  return (
    <div className="Editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        value={props.content}
        onChange={props.setContent}
      />
    </div>
  )
}

export default Editor
