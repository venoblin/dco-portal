import './GuidesNew.css'
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
  const [author, onAuthorChange, resetAuthor] = useFormState('Admin')
  const [title, onTitleChange, setTitle, resetTitle] = useFormState('')
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const newGuide = {
        author: author,
        title: title,
        content: content,
        shortDescription: quillInstance.root.innerText.slice(0, 255)
      }

      const res = await appContext.load(() => postGuide(newGuide))

      resetAuthor()
      resetTitle()
      setContent('')

      navigate(`/guides/${res.guide.id}`)
    } catch (error) {
      appContext.showPopup(error.message)
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

            <Editor setContent={setContent} />
          </form>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}

export default GuidesNew
