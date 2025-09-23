import { useEffect, useState } from 'react'
import { getAllGuides } from '../services/guides'
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

  useEffect(() => {
    getGuides()
  }, [])

  return (
    <div>
      <header>
        <h1>Guides</h1>
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
