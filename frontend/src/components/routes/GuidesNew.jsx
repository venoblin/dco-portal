import './GuidesNew.css'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFormState from '../../hooks/useFormState'
import ContentEditor from '../ContentEditor'

const GuidesNew = () => {
  const navigate = useNavigate()
  const [author, onAuthorChange, resetAuthor] = useFormState('Admin')
  const [title, onTitleChange, resetTitle] = useFormState('')
  const editorRef = useRef()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      // const newGuide = {
      //   author: author,
      //   title: title
      //   content: quill.root.innerHTML,
      //   shortDescription: quill.root.innerText.slice(0, 255)
      // }
      // const res = await postGuide(newGuide)
      // resetAuthor()
      // resetTitle()
      // quill.root.innerHTML = ''
      // quill.root.innerText = ''
      // navigate(`/guides/${res.guide.id}`)

      if (editorRef.current) {
        const content = editorRef.current.getContent()

        console.log(content)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
        <div className="input-wrap">
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
        <div className="input-wrap">
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

        <ContentEditor ref={editorRef} />
      </form>
    </div>
  )
}

export default GuidesNew
