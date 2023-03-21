import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'

// types
import { ShowResult } from '../../types/models'

const TvShowResult = () => {
  const location = useLocation()
  const result = location.state.result

  //! remove any type 
  const [tvShow, setTvShow] = useState<ShowResult>({
    name: "",
    seasons: [],
    id: 0,
    firstAirDate: ""
  })

  useEffect(() => {
    try {
      async function findShow() {
        const response = await searchService.findShow(result.id)
        setTvShow({
          name: response.name,
          seasons: response.seasons,
          id: response.id,
          firstAirDate: response.first_air_date,
        })
      }
      findShow()
    } catch (err) {
      console.log(err)
    }
  }, [result])

  console.log(result)

  return (
    <>
      <h1>TvShowResult Page</h1>
      <p>
        {tvShow.name}
      </p>
      <p>First Air Date: {tvShow.firstAirDate}</p>
      {tvShow.seasons.map(season =>
        <p key={season.name}>
          <Link to="/episodes" state={{ showId: tvShow.id, seasonNumber: season.season_number}}>
            {season.name}
          </Link>
        </p>
      )}
    </>
  );
}

export default TvShowResult;