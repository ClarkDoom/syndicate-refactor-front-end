import { useLocation } from "react-router";
import { Link } from "react-router-dom";


const SearchResults = () => {
  const location = useLocation()
  const results = location.state.results.results

  console.log(results)

  return (
    <>
      <h1>Search Results Component</h1>
      {results.map(result =>
        <p>
          <Link to="/tv-show-result" state={{ result: result}}>
            {result.name}
          </Link>
        </p>
      )}
    </>
  );
}

export default SearchResults;