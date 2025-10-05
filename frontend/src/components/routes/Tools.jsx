import { Link } from 'react-router-dom'
import Panel from '../ui/Panel'

const Tools = () => {
  return (
    <div>
      <header>
        <h1>Tools</h1>
      </header>

      <Panel>
        <Link className="block-link" to="/tools/incident-manager">
          Tools/Incident Manager →
        </Link>

        <Link className="block-link" to="/tools/device-lookup">
          Tools/Device Lookup →
        </Link>

        <Link className="block-link" to="/tools/triage-manager">
          Tools/Triage Manager →
        </Link>
      </Panel>
    </div>
  )
}

export default Tools
