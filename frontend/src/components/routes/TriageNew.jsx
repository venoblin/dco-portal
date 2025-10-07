import { Link } from 'react-router-dom'

const TriageNew = () => {
  return (
    <div>
      <header>
        <div>
          <Link to="/tools/triage-manager">← Back</Link>
          <h1>New Triage</h1>
        </div>

        <div className="inputs">
          <button>Download</button>
        </div>
      </header>
    </div>
  )
}

export default TriageNew
