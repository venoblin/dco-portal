import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import { postGuide } from '../../services/guides'
import LoadingIcon from '../LoadingIcon'
import Editor from '../Editor'

const GuidesNew = () => {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const [quillInstance, setQuillInstance] = useState(null)
  const [author, onAuthorChange, setAuthor, resetAuthor] = useFormState('Admin')
  const [title, onTitleChange, setTitle, resetTitle] = useFormState('')
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const newGuide = {
        author: author,
        title: title,
        content: content,
        shortDescription: quillInstance.getText().slice(0, 255)
      }

      const res = await appContext.load(() => postGuide(newGuide))

      resetAuthor()
      resetTitle()
      setContent('')

      navigate(`/guides/${res.guide.id}`)
    } catch {
      appContext.showPopup("Couldn't create guide")
    }
  }

  return (
    <div>
      {!appContext.isLoading ? (
        <div>
          <header>
            <div>
              <Link to="/guides">← Back</Link>
              <h1>New Guide</h1>
            </div>

            <button form="new-guide-form">Submit</button>
          </header>

          <form
            className="guide-form"
            id="new-guide-form"
            onSubmit={(event) => onSubmit(event)}
          >
            <div>
              <label htmlFor="author">Author</label>
              <input
                className="light"
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
                className="light"
                required
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(event) => onTitleChange(event)}
              />
            </div>

            <Editor
              setQuillInstance={setQuillInstance}
              content={content}
              setContent={setContent}
            />
          </form>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}

export default GuidesNew
