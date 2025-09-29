import './Search.css'
import useFormState from '../hooks/useFormState'
import { useEffect } from 'react'

const Search = (props) => {
  const [search, onSearchChange] = useFormState('')
  const [activeFilter, setActiveFilter] = useFormState('')

  const onSearch = (event) => {
    event.preventDefault()

    props.onSearch(search)
  }

  const handleFilterChange = (event) => {}

  useEffect(() => {
    if (props.filters && props.filters.length > 0)
      setActiveFilter(props.filters[0])
  }, [])

  return (
    <div className="Search">
      <form className="search" onSubmit={(event) => onSearch(event)}>
        {props.filters && props.filters.length > 0 && (
          <select
            className="filters-wrap"
            value={activeFilter}
            onChange={handleFilterChange}
          >
            {props.filters.map((f, i) => (
              <option value={f} key={i}>
                {f}
              </option>
            ))}
          </select>
        )}

        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          name="search"
          placeholder={`${props.placeholder ? props.placeholder : 'Search...'}`}
          value={search}
          onChange={(event) => onSearchChange(event)}
        />

        <button className="search">Search</button>
      </form>
    </div>
  )
}

export default Search
