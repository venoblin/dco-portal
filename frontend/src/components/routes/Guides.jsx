import './Guides.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllGuides, getGuidesByTitle } from '../../services/guides'
import useFormState from '../../hooks/useFormState'
import Panel from '../ui/Panel'
import GuideCard from '../GuideCard'

const Guides = () => {
  const [guides, setGuides] = useState([])
  const [search, onSearchChange] = useFormState('')

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

    try {
      const res = await getGuidesByTitle(search)

      setGuides(res.guides)
    } catch (error) {
      console.log(error.message)
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
