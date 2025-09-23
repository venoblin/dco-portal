import './Guides.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllGuides, getGuidesByTitle } from '../services/guides'
import Panel from '../components/ui/Panel'
import GuideCard from '../components/GuideCard'

const Guides = () => {
  const [guides, setGuides] = useState([])

  const getGuides = async () => {
    try {
      const allGuides = await getAllGuides()

      setGuides(allGuides)
    } catch (error) {
      console.log(error.message)
    }
  }

  const onSearch = async (event) => {
    event.preventDefault()

    const res = await getGuidesByTitle(search)
    setGuides(res.guides)
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
        {guides && guides.length > 0 ? (
          guides.map((g) => {
            ;<GuideCard guide={g} key={g.id} />
          })
        ) : (
          <p>No guides found!</p>
        )}
      </Panel>
    </div>
  )
}

export default Guides
