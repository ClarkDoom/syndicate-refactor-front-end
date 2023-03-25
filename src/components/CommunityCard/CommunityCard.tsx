import { CommunityCardProps } from '../../types/props'
import { Link } from "react-router-dom";
import { Review } from '../../types/models'
import communityStyles from "./CommunityCard.module.css"

const CommunityCard = (props: CommunityCardProps) => {

  const { show } = props

  return (
    <div className={communityStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
      <h2>{show.showName}</h2>
      <p>Added By: {show.profile.userName}</p>
      <p>Added To: {show.showType}</p>
      {show.reviews ?
        <div className="community-card-reviews">
          {show.reviews.map((review: Review) =>
            <Link key={review.id} to="/review" state={{ show: show, review: review }}>
              {review.reviewTitle}
            </Link>
          )}
        </div>
        :
        "no reviews"
      }
    </div>
  );
}

export default CommunityCard;