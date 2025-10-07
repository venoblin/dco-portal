import { Link } from 'react-router-dom'

const TriageNew = () => {
  return (
    <div>
      <header>
        <div>
          <Link to="/tools/triage-manager">← Back</Link>
          <h1>New Triage</h1>
        </div>

        <form>
          <input type="text" name="name" id="name" placeholder="Name" />
        </form>

        <div className="inputs">
          <button>New Path</button>
          <button>Download</button>
        </div>
      </header>
    </div>
  )
}

export default TriageNew
