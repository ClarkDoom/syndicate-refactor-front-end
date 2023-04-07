import { useLocation } from "react-router";
import { useEffect, useState } from "react";

// services
import * as searchService from '../../services/searchService'

// types
import { EpisodeResult, CastMemberResult } from '../../types/models'

import styles from "./Episode.module.css"

const Episode = () => {
  const location = useLocation()
  const episode = location.state.episode

  const [episodeDetails, setEpisodeDetails] = useState<EpisodeResult>({
    name: episode.name,
    air_date: episode.air_date,
    show_id: episode.show_id,
    season_number: episode.season_number,
    episode_number: episode.episode_number,
    overview: episode.overview,
    still_path: episode.still_path,
    runtime: episode.runtime,
    vote_average: episode.vote_average,
    id: episode.id,
    crew: episode.crew,
    guest_stars: episode.guest_stars,
    cast: []
  })

  const formattedDate = new Date(episodeDetails.air_date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })

  useEffect(() => {
    try {
      async function findSeason() {
        const response = await searchService.findCast(episodeDetails.show_id, episodeDetails.season_number, episodeDetails.episode_number)
        setEpisodeDetails({
          name: episode.name,
          air_date: episode.air_date,
          show_id: episode.show_id,
          season_number: episode.season_number,
          episode_number: episode.episode_number,
          overview: episode.overview,
          still_path: episode.still_path,
          runtime: episode.runtime,
          vote_average: episode.vote_average,
          id: episode.id,
          crew: episode.crew,
          guest_stars: episode.guest_stars,
          cast: response.cast
        })
      }
      findSeason()
    } catch (err) {
      console.log(err)
    }
  }, [episode])

  return (
    <div className={styles.page}>
      <h1>{episodeDetails.name}</h1>
      <p>{episodeDetails.overview}</p>
      <div className={styles.section1}>
        <div className={styles.subSection1}>
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${episodeDetails.still_path}`} alt="" className={styles.episodeStill} />
        </div>
        <div className={styles.subSection2}>
          <p>Season {episodeDetails.season_number}</p>
          <p>Episode {episodeDetails.episode_number}</p>
          <p>AirDate: {formattedDate}</p>
          <p>Runtime: {episodeDetails.runtime} minutes</p>
          <p>Rating: {episodeDetails.vote_average}</p>
        </div>
      </div>

      <div>
        <div>
          <h1>Cast</h1>
        </div>
        <div className={styles.castList}>
          {episodeDetails.cast.map((member: CastMemberResult) =>
            <div key={member.name} className={styles.card}>
              <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${member.profile_path}`} alt="" />
              <p>{member.name}</p>
              <p>{member.character}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Episode;