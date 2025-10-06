import './Guides.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { getAllGuides, getGuidesByTitle } from '../../services/guides'
import Panel from '../ui/Panel'
import GuideCard from '../GuideCard'
import LoadingIcon from '../LoadingIcon'
import Search from '../Search'

const Guides = () => {
  const appContext = useContext(AppContext)
  const [guides, setGuides] = useState(null)

  const getGuides = async () => {
    try {
      const res = await appContext.load(getAllGuides)

      setGuides(res.guides)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const onSearch = async (search) => {
    try {
      const res = await appContext.load(() => getGuidesByTitle(search))

      setGuides(res.guides)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  useEffect(() => {
    getGuides()
  }, [])

  return (
    <div>
      <header>
        <h1>Guides</h1>

        <div>
          <Search onSearch={onSearch} placeholder="Search by title..." />
        </div>

        <div>
          <Link to="/guides/new" className="btn">
            Create Guide
          </Link>
        </div>
      </header>

      <Panel>
        {!appContext.isLoading ? (
          guides && guides.length > 0 ? (
            guides.map((g) => <GuideCard guide={g} key={g.id} />)
          ) : (
            <p>No guides found!</p>
          )
        ) : (
          <LoadingIcon />
        )}
      </Panel>
    </div>
  )
}

export default Guides
