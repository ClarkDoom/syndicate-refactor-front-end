import { useLocation } from "react-router";
import { useEffect, useState } from "react";

// services
import * as searchService from '../../services/searchService'



const Episode = () => {
  const location = useLocation()
  const episode = location.state.episode

  const [episodeDetails, setEpisodeDetails] = useState<any>({
    name: episode.name,
    airDate: episode.air_date,
    showId: episode.show_id,
    seasonNumber: episode.season_number,
    episodeNumber: episode.episode_number,
    episodeDescription: episode.overview,
    posterPath: episode.still_path,
    runtime: episode.runtime,
    rating: episode.vote_average,
    episodeId: episode.id,
    crew: episode.crew,
    guestStars: episode.guest_stars,
    cast: []
  })

  useEffect(() => {
    try {
      async function findSeason() {
        const response = await searchService.findCast(episodeDetails.showId, episodeDetails.seasonNumber, episodeDetails.episodeNumber)
        setEpisodeDetails({
          name: episode.name,
          airDate: episode.air_date,
          showId: episode.show_id,
          seasonNumber: episode.season_number,
          episodeNumber: episode.episode_number,
          episodeDescription: episode.overview,
          posterPath: episode.still_path,
          runtime: episode.runtime,
          rating: episode.vote_average,
          episodeId: episode.id,

          crew: episode.crew,
          guestStars: episode.guest_stars,
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
    <p>AirDate: {episodeDetails.airDate}</p>
    <p>Season Number: {episodeDetails.seasonNumber}</p>
    <p>Episode Number: {episodeDetails.episodeNumber}</p>
    <p>Description: {episodeDetails.episodeDescription}</p>
    <p>Runtime: {episodeDetails.runtime} minutes</p>
    <p>Rating: {episodeDetails.rating}</p>
    <h1>Cast</h1>
    {episodeDetails.cast.map(member => 
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