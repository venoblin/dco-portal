import './Search.css'
import useFormState from '../hooks/useFormState'

const Search = (props) => {
  const [search, onSearchChange] = useFormState('')
  const [activeFilter, setActiveFilter] = useFormState(props.filters[0] || null)

  const cleanFilter = (filter) => {
    const cleaned = filter.replace('_', ' ')

    return cleaned
  }

  const onSearch = (event) => {
    event.preventDefault()

    props.onSearch(search, activeFilter)
  }

  const handleFilterChange = (event) => {
    setActiveFilter(event)
  }

  return (
    <div className="Search">
      <form className="search" onSubmit={(event) => onSearch(event)}>
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
