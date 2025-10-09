import './GuideEdit.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { getSingleGuide } from '../../services/guides'
import useFormState from '../../hooks/useFormState'
import LoadingIcon from '../LoadingIcon'

const GuideEdit = () => {
  const appContext = useContext(AppContext)
  const [title, onTitleChange, setTitle, resetTitle] = useFormState('')
  const [content, setContent] = useState('')
  const { id } = useParams()

  const getGuide = async () => {
    try {
      const res = await appContext.load(() => getSingleGuide(id))

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

      {!appContext.isLoading ? <div></div> : <LoadingIcon />}
    </div>
  )
}

export default GuideEdit
