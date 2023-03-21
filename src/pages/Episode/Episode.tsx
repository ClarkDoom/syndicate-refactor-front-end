import { useLocation } from "react-router";
import { useEffect, useState } from "react";

// services
import * as searchService from '../../services/searchService'

// types
import { EpisodeResult, CastMemberResult } from '../../types/models'

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

  console.log(episodeDetails)

  return (
    <>
    <h1>Episode Page</h1>
    <p>Name: {episodeDetails.name}</p>
    <p>AirDate: {episodeDetails.air_date}</p>
    <p>Season Number: {episodeDetails.season_number}</p>
    <p>Episode Number: {episodeDetails.episode_number}</p>
    <p>Description: {episodeDetails.overview}</p>
    <p>Runtime: {episodeDetails.runtime} minutes</p>
    <p>Rating: {episodeDetails.vote_average}</p>
    <h1>Cast</h1>
    {episodeDetails.cast.map((member: CastMemberResult) => 
      <div key={member.name}>
        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${member.profile_path}`} alt="" />
        <p>Name: {member.name}</p>
        <p>Character: {member.character}</p>
      </div>  
    )}
    </>
  );
}

export default Episode;