// npm packages
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'

// types
import { SeasonResult, EpisodeResult } from '../../types/models'

const EpisodeList = () => {
  const location = useLocation()
  const seasonNumber = location.state.seasonNumber
  const showId = location.state.showId

  const [season, setSeason] = useState<SeasonResult>({
    name: "",
    season_number: 0,
    overview: "",
    poster_path: "",
    air_date: "",
    episodes: [],

  })

  useEffect(() => {
    try {
      async function findSeason() {
        const response = await searchService.findSeason(showId, seasonNumber)
        setSeason({
          name: response.name,
          season_number: response.season_number,
          air_date: response.air_date,
          poster_path: response.poster_path,
          episodes: response.episodes,
          overview: response.overview,
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
      <p>{season.overview}</p>
      <p>{season.poster_path}</p>
      <p>{season.air_date}</p>
      {season.episodes.map((episode: EpisodeResult) =>
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