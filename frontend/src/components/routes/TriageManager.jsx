import { Link } from 'react-router-dom'

const TriageManager = () => {
  return (
    <div>
      <header>
        <h1>Triage Manager</h1>

        <Link to="/tools/triage-manager/new" className="btn">
          Create Triage
        </Link>
      </header>
    </div>
  )
}

export default TriageManager
