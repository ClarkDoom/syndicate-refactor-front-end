import { useLocation, useNavigate } from "react-router";

const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const results = location.state.results
  
  console.log(results)

  return (
    <>
    <h1>Search Results Component</h1>
    </>
  );
}

export default SearchResults;