import './Dashboard.css'
import Panel from '../ui/Panel'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { useEffect, useState } from 'react'
import { getAllGuides } from '../../services/guides'
import GuideCard from '../GuideCard'

const Dashboard = () => {
  const [guides, setGuides] = useState()

  const getRecentGuides = async () => {
    try {
      const res = await getAllGuides('limit=5')

      setGuides(res.guides)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRecentGuides()
  }, [])

  if (!guides) {
    return <Loading />
  }

  return (
    <div className="Dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard">
        <Panel>
          <header>
            <h2>Quick Links</h2>
          </header>

          <div>
            <Link className="block-link" to="/tools/triage-manager">
              Tools/Triage Manager →
            </Link>
            <Link className="block-link" to="/tools/incident-manager">
              Tools/Incident Manager →
            </Link>
          </div>
        </Panel>

        <Panel>
          <header>
            <h2>Recent Guides</h2>
            <Link className="block-link" href="/guides">
              View More →
            </Link>
          </header>

          {guides.length > 0 ? (
            guides.map((g) => <GuideCard key={g.id} guide={g} isMini={true} />)
          ) : (
            <p>No guides found!</p>
          )}
        </Panel>
      </div>
    </div>
  )
}

export default Dashboard
