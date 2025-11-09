import './Dashboard.css'
import Panel from '../ui/Panel'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { getAllGuides } from '../../services/guides'
import { AppContext } from '../../contexts/AppContext'
import GuideCard from '../GuideCard'
import LoadingIcon from '../LoadingIcon'
import ThemeToggle from '../ThemeToggle'

const Dashboard = (props) => {
  const appContext = useContext(AppContext)
  const [guides, setGuides] = useState(null)

  const getRecentGuides = async () => {
    try {
      const res = await appContext.load(() => getAllGuides('limit=5'))

      if (res) {
        setGuides(res.guides)
      }
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  useEffect(() => {
    getRecentGuides()
  }, [])

  return (
    <div className="Dashboard">
      <header>
        <h1>Dashboard</h1>

        <ThemeToggle currentTheme={props.themeName} setTheme={props.setTheme} />
      </header>

      <div className="dashboard">
        <Panel>
          <header>
            <h2>Quick Links</h2>
          </header>

          <div>
            <Link className="block-link" to="/tools/incident-manager">
              Tools/Incident Manager →
            </Link>

            <Link className="block-link" to="/tools/device-lookup">
              Tools/Device Lookup →
            </Link>

            <Link className="block-link" to="/tools/triage-manager">
              Tools/Triage Manager →
            </Link>

            <Link className="block-link" to="/tools/barcode-generator">
              Tools/Barcode Generator →
            </Link>
          </div>
        </Panel>

        <Panel>
          <header>
            <h2>Recent Guides</h2>
            <div className="links">
              <Link to="/guides/new">Create Guide →</Link>
              <Link to="/guides">View More →</Link>
            </div>
          </header>

          {!appContext.isLoading ? (
            guides && guides.length > 0 ? (
              guides.map((g) => (
                <GuideCard key={g.id} guide={g} isMini={true} />
              ))
            ) : (
              <p>No guides found!</p>
            )
          ) : (
            <LoadingIcon />
          )}
        </Panel>
      </div>
    </div>
  )
}

export default Dashboard
