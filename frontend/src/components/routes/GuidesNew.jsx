import './GuidesNew.css'
import Quill from 'quill'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import { postGuide } from '../../services/guides'

const GuidesNew = () => {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const [author, onAuthorChange, resetAuthor] = useFormState('Admin')
  const [title, onTitleChange, resetTitle] = useFormState('')
  const [quillInstance, setQuillInstance] = useState(null)
  const [content, setContent] = useState('')
  const editorRef = useRef(null)

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

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const newGuide = {
        author: author,
        title: title,
        content: content,
        shortDescription: quillInstance.root.innerText.slice(0, 255)
      }

      const res = await postGuide(newGuide)

      resetAuthor()
      resetTitle()
      setContent('')

      navigate(`/guides/${res.guide.id}`)
    } catch (error) {
      appContext.popupToggle(error.message)
    }
  }

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
        setContent(editor.root.innerHTML)
      })
    }
  }, [quillInstance])

  return (
    <div>
      <header>
        <div>
          <Link to="/guides">← Back</Link>
          <h1>New Guide</h1>
        </div>

        <button form="new-guide-form">Submit</button>
      </header>

      <form
        className="new-guide-form"
        id="new-guide-form"
        onSubmit={(event) => onSubmit(event)}
      >
        <div>
          <label htmlFor="author">Author</label>
          <input
            required
            type="text"
            name="author"
            id="author"
            placeholder="Author"
            value={author}
            onChange={(event) => onAuthorChange(event)}
            disabled
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(event) => onTitleChange(event)}
          />
        </div>

        <div className="editor-container">
          <div ref={editorRef}></div>
        </div>
      </form>
    </div>
  )
}

export default GuidesNew
