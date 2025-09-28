import './Guides.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { getAllGuides, getGuidesByTitle } from '../../services/guides'
import useFormState from '../../hooks/useFormState'
import Panel from '../ui/Panel'
import GuideCard from '../GuideCard'
import Loading from '../Loading'

const Guides = () => {
  const appContext = useContext(AppContext)
  const [guides, setGuides] = useState(null)
  const [search, onSearchChange] = useFormState('')

  const getGuides = async () => {
    try {
      const res = await appContext.load(getAllGuides)

      setGuides(res.guides)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const onSearch = async (event) => {
    event.preventDefault()

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
          <form className="search" onSubmit={(event) => onSearch(event)}>
            <label htmlFor="search"></label>
            <input
              id="search"
              type="text"
              name="search"
              placeholder="Search by title..."
              value={search}
              onChange={(event) => onSearchChange(event)}
            />

            <button className="search">Search</button>
          </form>
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
          <Loading />
        )}
      </Panel>
    </div>
  )
}

export default Guides
