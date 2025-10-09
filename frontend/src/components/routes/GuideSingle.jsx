import './GuideSingle.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { cleanTime } from '../../utils'
import { getSingleGuide } from '../../services/guides'
import LoadingIcon from '../LoadingIcon'

const GuideSingle = () => {
  const appContext = useContext(AppContext)
  const { id } = useParams()
  const [guide, setGuide] = useState(null)

  const getGuide = async () => {
    try {
      const res = await appContext.load(() => getSingleGuide(id))

      setGuide(() => res.guide)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  useEffect(() => {
    getGuide()
  }, [])

  return (
    <div className="GuideSingle">
      {!appContext.isLoading ? (
        guide && (
          <div>
            <header>
              <div>
                <Link to="/guides">← Back</Link>
                <h1>{guide.title}</h1>
                <p className="muted-text">By {guide.author}</p>
                <p className="muted-text">
                  Created {cleanTime(guide.createdAt)}
                </p>
                {guide.updatedAt !== guide.createdAt && (
                  <p className="updated-at muted-text">
                    Updated {cleanTime(guide.updatedAt)}
                  </p>
                )}
              </div>

              <div className="inputs">
                <Link className="btn" to={`/guides/${id}/edit`}>
                  Edit
                </Link>
              </div>
            </header>

            <div
              className="content ql-editor"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            ></div>
          </div>
        )
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}

export default GuideSingle
