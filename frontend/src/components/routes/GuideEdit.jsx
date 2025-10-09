import './GuideEdit.css'
import { Link, useParams } from 'react-router-dom'

const GuideEdit = () => {
  const { id } = useParams()

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
    </div>
  )
}

export default GuideEdit
