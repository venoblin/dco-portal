import './GuidesNew.css'
import { Link, useNavigate } from 'react-router-dom'
import useFormState from '../hooks/useFormState'

const GuidesNew = () => {
  const navigate = useNavigate()
  const [author, onAuthorChange, resetAuthor] = useFormState('')
  const [title, onTitleChange, resetTitle] = useFormState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const newGuide = {
      author: author,
      title: title
      // content: quill.root.innerHTML,
      // shortDescription: quill.root.innerText.slice(0, 255)
    }

    const res = await postGuide(newGuide)

    resetAuthor()
    resetTitle()
    // quill.root.innerHTML = ''
    // quill.root.innerText = ''

    navigate(`/guides/${res.guide.id}`)
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
          <div id="editor"></div>
        </div>
      </form>
    </div>
  )
}

export default GuidesNew
