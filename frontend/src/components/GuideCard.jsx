import './GuideCard.css'

const GuideCard = (props) => {
  return (
    <div className={`GuideCard${props.isMini ? ' mini' : ''}`}>
      <div>
        <a class="title" href={`/guides/${props.guide.id}`}>
          {props.guide.title} →
        </a>
        <p class="author muted-text">By {props.guide.author}</p>
        <p class="created-at muted-text">
          Created {cleanTime(props.guide.createdAt)}
        </p>
        {props.guide.updatedAt !== props.guide.createdAt && (
          <p class="updated-at muted-text">
            Updated {cleanTime(props.guide.updatedAt)}
          </p>
        )}
      </div>

      {!props.isMini && (
        <div>
          <p class="shortDescription">{props.guide.shortDescription}...</p>
        </div>
      )}
    </div>
  )
}

export default GuideCard
