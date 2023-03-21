import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'

// types
import { ShowResult, SeasonResult } from '../../types/models'

const TvShowResult = () => {
  const location = useLocation()
  const result = location.state.result

  const [tvShow, setTvShow] = useState<ShowResult>({
    name: "",
    seasons: [],
    id: 0,
    first_air_date: "", 
    poster_path: ''
  })

  useEffect(() => {
    try {
      async function findShow() {
        const response = await searchService.findShow(result.id)
        setTvShow({
          name: response.name,
          seasons: response.seasons,
          id: response.id,
          first_air_date: response.first_air_date,
          poster_path: response.poster_path
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
      <p>First Air Date: {tvShow.first_air_date}</p>
      {tvShow.seasons.map((season: SeasonResult) =>
      <div key={season.name}>
        <p>
          <Link to="/episodes" state={{ showId: tvShow.id, seasonNumber: season.season_number}}>
            {season.name}
          </Link>
        </p>
      </div>
      )}
    </>
  );
}

export default TvShowResult;