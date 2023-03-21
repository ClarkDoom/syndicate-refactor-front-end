import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'

const TvShowResult = () => {
  const location = useLocation()
  const result = location.state.result

  //! remove any type 
  const [tvShow, setTvShow] = useState<any>({
    name: "",
    seasons: [],
    showId: 0
  })

  useEffect(() => {
    try {
      async function findShow() {
        const response = await searchService.findShow(result.id)
        console.log("response ALERT", response)
        setTvShow({
          name: response.name,
          seasons: response.seasons,
          showId: response.id
        })
      }
      findShow()
    } catch (err) {
      console.log(err)
    }
  }, [result])


  return (
    <>
      <h1>TvShowResult Page</h1>
      <p>
        {tvShow.name}
      </p>
      {tvShow.seasons.map(season =>
        <p>
          <Link to="/episodes" state={{ showId: tvShow.showId, seasonId: season.id}}>
            {season.name}
          </Link>
        </p>
      )}
    </>
  );
}

export default TvShowResult;