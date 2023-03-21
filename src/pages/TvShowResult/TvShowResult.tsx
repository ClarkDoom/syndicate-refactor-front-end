import { useLocation } from "react-router";

const TvShowResult = () => {
  const location = useLocation()
  const result = location.state.result

  return (
    <>
      <h1>TvShowResult Page</h1>
      <p>
        {result.name}
      </p>
    </>
  );
}

export default TvShowResult;