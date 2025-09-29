import './Search.css'
import useFormState from '../hooks/useFormState'

const Search = (props) => {
  const [search, onSearchChange] = useFormState('')

  const onSearch = (event) => {
    event.preventDefault()

    props.onSearch(search)
  }

  return (
    <div className="Search">
      <form className="search" onSubmit={(event) => onSearch(event)}>
        <label htmlFor="search"></label>
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
