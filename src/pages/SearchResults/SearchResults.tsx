import { useLocation } from "react-router";

import ResultCard from "../../components/ResultCard/ResultCard";

// types
import { ShowResult } from '../../types/models'

import searchResultsStyles from "../SearchResults/SearchResults.module.css"

const SearchResults = () => {
  const location = useLocation()
  const results = location.state.results.results

  return (
    <div>
      <h1>Search Results</h1>
      <div className={searchResultsStyles.cardList}>
        {results.map((result: ShowResult) =>
          <ResultCard result={result} key={result.id} />
        )}
      </div>
    </div>
  );
}

export default SearchResults;