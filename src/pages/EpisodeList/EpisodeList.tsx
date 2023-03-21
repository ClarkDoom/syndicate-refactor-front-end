import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'

const EpisodeList = () => {
  const location = useLocation()
  const seasonNumber = location.state.seasonNumber
  const showId = location.state.showId

  const [season, setSeason] = useState<any>({
    name: "",
    seasonDescription: "",
    posterPath: "",
    airDate: "",
    episodes: [],

  })

  useEffect(() => {
    try {
      async function findSeason() {
        const response = await searchService.findSeason(showId, seasonNumber)
        setSeason({
          name: response.name,
          airDate: response.air_date,
          posterPath: response.poster_path,
          episodes: response.episodes,
          seasonDescription: response.overview,
        })
      }
      findSeason()
    } catch (err) {
      console.log(err)
    }
  }, [seasonNumber])


  return (
    <>
      <h1>Episode List Component</h1>
      <p>{season.name}</p>
      <p>{season.seasonDescription}</p>
      <p>{season.posterPath}</p>
      <p>{season.airDate}</p>
      {season.episodes.map(episode =>
        <div key={episode.name}>
          <p>--------------</p>
          <Link to="/episode" state={{ episode: episode }}>
            <p>Name: {episode.name}</p>
          </Link>
          <p>Img Path: {episode.still_path}</p>
          <p>Episode Number: {episode.episode_number}</p>
          <p>Vote Average: {episode.vote_average}</p>
        </div>
      )}
    </>
  );
}

export default EpisodeList;