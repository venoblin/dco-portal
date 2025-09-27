import 'react-quill/dist/quill.snow.css'
import './ContentEditor.css'
import { useState, forwardRef, useImperativeHandle } from 'react'
import ReactQuill from 'react-quill'

const ContentEditor = forwardRef((props, ref) => {
  const [content, setContent] = useState('')

  const modules = {
    toolbar: [
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
  }

  useImperativeHandle(ref, () => ({
    getContent: () => {},
    getEditorState: () => editorState
  }))

  const handleContentChange = (value) => {
    setContent(value)
  }

  return (
    <div className="ContentEditor">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        modules={modules}
      />
    </div>
  )
})

export default ContentEditor
