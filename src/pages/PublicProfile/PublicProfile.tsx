import { Link } from "react-router-dom";
import { PublicProfileProps } from "../../types/props";
import { Show, Review, Profile } from "../../types/models";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";


import * as profileService from "../../services/profileService"

import profilePageStyles from "./PublicProfile.module.css"

const PublicProfile = () => {
  const location = useLocation()  
const profileId = location.state.profileId

  console.log(profileId)

  const [profile, setProfile] = useState<Profile>({
    name: "",
    userName: "",
    aboutMe: "",
    photo: "",
    id: 0,
    shows: [],
    reviews: []
  })

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(profileId!)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])

  const favoriteShows = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "favorite")
  })
  const watchlist = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "watchlist")
  })
  const watchlistCount = watchlist.length
  const currentlyWatching = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "currently watching")
  })
  const currentlyWatchingCount = currentlyWatching.length
  const seenIt = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "seen it")
  })
  const seenItCount = seenIt.length
  const reviews = profile.reviews
  const reviewsCount = reviews.length
  console.log(reviews)

  return (
    <div className={profilePageStyles.page}>
      <h1 className={profilePageStyles.userName}>@{profile.userName}</h1>
      <div className={profilePageStyles.profileSection}>
        <img src={profile.photo} alt="" />
        <div className={profilePageStyles.profileInfo}>
          <p>{profile.aboutMe}</p>
          <div className={profilePageStyles.statsHeaders}>
            <p>Show's in Watchlist</p>
            <p>Show's in Currently Watching</p>
            <p>Shows Watched</p>
            <p>Reviews Written</p>
          </div>
          <div className={profilePageStyles.statsData}>
            <p>{watchlistCount}</p>
            <p>{currentlyWatchingCount}</p>
            <p>{seenItCount}</p>
            <p>{reviewsCount}</p>
          </div>
        </div>
      </div>
      <div className={profilePageStyles.section}>
        <h1>Favorites</h1>
        <div className={profilePageStyles.sectionShows}>
          {favoriteShows.map((show: Show) =>
            <Link to="/tv-show-result" state={{ resultId: show.tmbdShowId }} key={show.id}>
              <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="TV Show Poster" />
            </Link>
          )}
        </div>
      </div>
      <div className={profilePageStyles.section}>
        <h1>Watchlist</h1>
        <div className={profilePageStyles.sectionShows}>
          {watchlist.map((show: Show) =>
            <Link to="/tv-show-result" state={{ resultId: show.tmbdShowId }} key={show.id}>
              <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="TV Show Poster" />
            </Link>
          )}
        </div>
      </div>
      <div className={profilePageStyles.section}>
        <h1>Currently Watching</h1>
        <div className={profilePageStyles.sectionShows}>
          {currentlyWatching.map((show: Show) =>
            <Link to="/tv-show-result" state={{ resultId: show.tmbdShowId }} key={show.id}>
              <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="TV Show Poster" />
            </Link>
          )}
        </div>
      </div>
      <div className={profilePageStyles.section}>
        <h1>Show's Seen</h1>
        <div className={profilePageStyles.sectionShows}>
          {seenIt.map((show: Show) =>
            <Link to="/tv-show-result" state={{ resultId: show.tmbdShowId }} key={show.id}>
              <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="TV Show Poster" />
            </Link>
          )}
        </div>
      </div>
      <div className={profilePageStyles.section}>
        <h1>Reviews</h1>
        <div className={profilePageStyles.sectionShows}>
          {reviews.map((review: Review) =>
            <div className={profilePageStyles.reviews}>
              <Link to="/review" state={{ review: review, show: review.reviewOf }}>
                <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${review.reviewOf.imageUrl}`} alt="TV Show Poster" />
                <p>{review.reviewTitle}</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;