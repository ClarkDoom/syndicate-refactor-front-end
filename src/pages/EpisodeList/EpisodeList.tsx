// npm packages
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'

// types
import { SeasonResult, EpisodeResult } from '../../types/models'

import styles from "./EpisodeList.module.css"

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
    <div className={styles.page}>
      <h1>{season.name}</h1>
      <p>{season.overview}</p>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${season.poster_path}`} alt="" />
      <p>{season.air_date}</p>
      <div className={styles.cardList}>
        {season.episodes.map((episode: EpisodeResult) =>
          <div key={episode.name} className={styles.card}>
            <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${episode.still_path}`} alt="" />
            <p>Episode {episode.episode_number}</p>
            <Link to="/episode" state={{ episode: episode }}>
              <p>{episode.name}</p>
            </Link>
            <p>Vote Average: {episode.vote_average}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EpisodeList;