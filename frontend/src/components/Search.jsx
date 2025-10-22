import { useContext } from 'react'
import useFormState from '../hooks/useFormState'
import { AppContext } from '../contexts/AppContext'

const Search = (props) => {
  const appContext = useContext(AppContext)
  const [search, handleSearchChange] = useFormState('')
  const [activeFilter, setActiveFilter] = useFormState(
    props.filters ? props.filters[0] : null
  )

  const cleanFilter = (filter) => {
    const cleaned = filter.replace('_', ' ')

    return cleaned
  }

  const onSearchSubmit = (event) => {
    event.preventDefault()

    props.onSearch(search, activeFilter)
  }

  const handleFilterChange = (event) => {
    setActiveFilter(event)
  }

  return (
    <div className="Search">
      <form
        className="search input-button-combine"
        onSubmit={(event) => onSearchSubmit(event)}
      >
        {props.filters && props.filters.length > 0 && (
          <select
            className="filters-wrap"
            value={activeFilter}
            onChange={(event) => handleFilterChange(event)}
          >
            {props.filters.map((f, i) => (
              <option value={f} key={i}>
                {cleanFilter(f)}
              </option>
            ))}
          </select>
        )}

        <label htmlFor="search">Search</label>
        <input
          disabled={appContext.isLoading ? true : false}
          className="light"
          id="search"
          type="text"
          name="search"
          placeholder={`${props.placeholder ? props.placeholder : 'Search...'}`}
          value={search}
          onChange={(event) => handleSearchChange(event)}
        />

        <button
          className="search"
          disabled={appContext.isLoading ? true : false}
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search
