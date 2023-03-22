import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// services
import * as searchService from '../../services/searchService'
import * as showService from '../../services/showService'

// types
import { ShowResult, SeasonResult } from '../../types/models'
import { TvShowResultProps } from '../../types/props'
import { CreateShowForm } from "../../types/forms";

const TvShowResult = (props: TvShowResultProps): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state.result

  const { profileId } = props

  const [tvShow, setTvShow] = useState<ShowResult>({
    name: "",
    seasons: [],
    id: 0,
    first_air_date: "",
    poster_path: "",
    overview: ""
  })

  const [showForm, setShowForm] = useState<CreateShowForm>({
    tmbdShowId: tvShow.id,
    showName: tvShow.name,
    showDescription: tvShow.overview,
    imageUrl: tvShow.poster_path,
    showType: ""
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
          poster_path: response.poster_path,
          overview: response.overview
        })
      }
      findShow()
    } catch (err) {
      console.log(err)
    }
  }, [result])

  useEffect(() => {
    try {
      setShowForm({
        tmbdShowId: tvShow.id,
        showName: tvShow.name,
        showDescription: tvShow.overview,
        imageUrl: tvShow.poster_path,
        showType: ""
      })
    } catch (err) {
      console.log(err)
    }
  }, [tvShow])

  const handleSubmit = async (evt: React.MouseEvent): Promise<any> => {
    evt.preventDefault()
    const target = evt.target as HTMLButtonElement
    try {
      await showService.addShow(profileId, { ...showForm, showType: target.id })
      const route = target.id.replace(/\s+/g, '-')
      if(route === "favorite"){
        navigate('/profile')
      } else {
        navigate(`/${route}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>TvShowResult Page</h1>
      <p>
        {tvShow.name}
      </p>
      <p>First Air Date: {tvShow.first_air_date}</p>
      <button onClick={handleSubmit} key="ALERT" id="watchlist">Watchlist</button>
      <button onClick={handleSubmit} id="currently watching">Currently Watching</button>
      <button onClick={handleSubmit} id="seen it">Seen It</button>
      <button onClick={handleSubmit} id="favorite">Favorite</button>
      {tvShow.seasons.map((season: SeasonResult) =>
        <div key={season.name}>
          <p>
            <Link to="/episodes" state={{ showId: tvShow.id, seasonNumber: season.season_number }}>
              {season.name}
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default TvShowResult;