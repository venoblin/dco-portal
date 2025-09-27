import 'quill/dist/quill.snow.css'
import './GuideSingle.css'
import { cleanTime } from '../../utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleGuide } from '../../services/guides'

const GuideSingle = () => {
  const { id } = useParams()
  const [guide, setGuide] = useState()

  const getGuide = async () => {
    try {
      const res = await getSingleGuide(id)

      setGuide(() => res.guide)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGuide()
  }, [])

  if (!guide) {
    return (
      <div className="GuideSingle">
        <h1>Loading Guide...</h1>
      </div>
    )
  }

  return (
    <div className="GuideSingle">
      <header>
        <div>
          <a href="/guides">← Back</a>
          <h1>{guide.title}</h1>
          <p className="muted-text">By {guide.author}</p>
          <p className="muted-text">Created {cleanTime(guide.createdAt)}</p>
          {guide.updatedAt !== guide.createdAt && (
            <p className="updated-at muted-text">
              Updated {cleanTime(guide.updatedAt)}
            </p>
          )}
        </div>
      </header>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      ></div>
    </div>
  )
}

export default GuideSingle
