import './GuideCard.css'
import { Link } from 'react-router-dom'
import { cleanTime } from '../utils'

const GuideCard = (props) => {
  return (
    <div className={`GuideCard${props.isMini ? ' mini' : ''}`}>
      <div>
        <Link className="title" to={`/guides/${props.guide.id}`}>
          {props.guide.title} →
        </Link>
        <p className="author muted-text">By {props.guide.author}</p>
        <p className="created-at muted-text">
          Created {cleanTime(props.guide.createdAt)}
        </p>
        {props.guide.updatedAt !== props.guide.createdAt && (
          <p className="updated-at muted-text">
            Updated {cleanTime(props.guide.updatedAt)}
          </p>
        )}
      </div>

      {!props.isMini && (
        <div>
          <p className="shortDescription">{props.guide.shortDescription}...</p>
        </div>
      )}
    </div>
  )
}

export default GuideCard
