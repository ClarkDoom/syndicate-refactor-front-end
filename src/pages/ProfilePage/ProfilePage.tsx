import { Link } from "react-router-dom";
import { ProfilePageProps } from "../../types/props";
import { Show, Review } from "../../types/models";


const Profile = (props: ProfilePageProps) => {

  const { profile } = props

  const favoriteShows = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "favorite")
  })
  const currentlyWatching = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "currently watching")
  })
  const seenIt = profile.shows.filter((show: Show) => {
    return (show.showType.toString() === "seen it")
  })
  const reviews = profile.reviews

  console.log(reviews)


  return (
    <>
      <h1>Profile Page</h1>
      <Link to="/edit-profile">
        Edit Profile
      </Link>
      <Link to="/change-password">
        Change Password
      </Link>
      <img src={profile.photo} alt="" />
      <h2>{profile.userName}</h2>
      <p>{profile.aboutMe}</p>
      <h1>Favorites</h1>
      {favoriteShows.map((show: Show) =>
        <p>{show.showName}</p>
      )}
      <h1>Currently Watching</h1>
      {currentlyWatching.map((show: Show) =>
        <p>{show.showName}</p>
      )}
      <h1>Show's Seen</h1>
      {seenIt.map((show: Show) =>
        <p>{show.showName}</p>
      )}
      <h1>Reviews</h1>
      {reviews.map((review: Review) =>
        <div>
          <h2>{review.reviewTitle}</h2>
          <p>{review.rating}</p>
          <p>{review.reviewContent}</p>
        </div>
      )}
    </>
  );
}

export default Profile;