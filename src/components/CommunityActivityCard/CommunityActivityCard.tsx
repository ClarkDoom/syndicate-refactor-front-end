import { CommunityCardProps } from '../../types/props'
import { Link } from "react-router-dom";
import { Review } from '../../types/models'
import communityActivityCardStyles from "./CommunityActivityCard.module.css"

const CommunityCard = (props: CommunityCardProps) => {

  const { show } = props

  return (
    <div className={communityActivityCardStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
      <div className={communityActivityCardStyles.cardDetails}>
        <p>{show.showName}</p>
        <p>Added By: {show.profile.userName}</p>
        <p>Added To: {show.showType}</p>
      </div>
      {/* {show.reviews ?
        <div className="community-card-reviews">
          {show.reviews.map((review: Review) =>
            <Link key={review.id} to="/review" state={{ show: show, review: review }}>
              {review.reviewTitle}
            </Link>
          )}
        </div>
        :
        "no reviews"
      } */}
    </div>
  );
}

export default CommunityCard;