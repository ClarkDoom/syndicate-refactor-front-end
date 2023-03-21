import { useLocation } from "react-router";
import { Link } from "react-router-dom";


// types
import { ShowResult } from '../../types/models'


const SearchResults = () => {
  const location = useLocation()
  const results = location.state.results.results

  return (
    <div>
      <h1>Search Results Component</h1>
      {results.map((result: ShowResult) =>
        <div  key={result.id}>
          <p>-----------</p>
          <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${result.poster_path}`} alt="" />
          <p>
            <Link to="/tv-show-result" state={{ result: result }}>
              {result.name}
            </Link>
          </p>
          <p>{result.first_air_date}</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;