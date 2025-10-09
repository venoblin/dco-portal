import './GuideEdit.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import { getSingleGuide } from '../../services/guides'
import useFormState from '../../hooks/useFormState'
import LoadingIcon from '../LoadingIcon'
import Editor from '../Editor'

const GuideEdit = () => {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const [quillInstance, setQuillInstance] = useState(null)
  const [author, onAuthorChange, setAuthor] = useFormState('Admin')
  const [title, onTitleChange, setTitle] = useFormState('')
  const [content, setContent] = useState('')
  const { id } = useParams()

  const getGuide = async () => {
    try {
      const res = await appContext.load(() => getSingleGuide(id))

      setAuthor(res.guide.author)
      setTitle(res.guide.title)
      setContent(res.guide.content)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  useEffect(() => {
    getGuide()
  }, [])

  return (
    <div className="GuideEdit">
      <header>
        <div>
          <Link to={`/guides/${id}`}>← Back</Link>
          <h1>Edit Guide</h1>
        </div>

        <div className="inputs">
          <button>Update</button>
          <button className="danger">Delete</button>
        </div>
      </header>

      {!appContext.isLoading ? (
        <div>
          <form
            className="edit-guide-form"
            id="edit-guide-form"
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

            <Editor
              content={content}
              setContent={setContent}
              quillInstance={quillInstance}
              setQuillInstance={setQuillInstance}
            />
          </form>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}

export default GuideEdit
