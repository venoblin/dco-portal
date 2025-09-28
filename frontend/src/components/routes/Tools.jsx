import { Link } from 'react-router-dom'
import Panel from '../ui/Panel'

const Tools = () => {
  return (
    <div>
      <header>
        <h1>Tools</h1>
      </header>

      <Panel>
        <Link className="block-link" to="/tools/triage-manager">
          Triage Manager →
        </Link>

        <Link className="block-link" to="/tools/incident-manager">
          Incident Manager →
        </Link>
      </Panel>
    </div>
  )
}

export default Tools
