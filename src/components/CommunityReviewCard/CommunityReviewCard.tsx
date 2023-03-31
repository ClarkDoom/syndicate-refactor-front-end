import { CommunityReviewCardProps } from '../../types/props'
import communityReviewCardStyles from "./CommunityReviewCard.module.css"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'


const CommunityReviewCard = (props: CommunityReviewCardProps) => {
  const navigate = useNavigate()
  const { review } = props

  const formattedUserName = " @" + review.reviewBy.userName.toUpperCase() + " "

  const handleReviewNav = () => {
    navigate('/review', {
      state: {
        review: review,
        show: review.reviewOf
      }
    })
  };

  return (
    <div className={communityReviewCardStyles.card}>
      <Link to="/tv-show-result" state={{ resultId: review.reviewOf.tmbdShowId }}>
        <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${review.reviewOf.imageUrl}`} alt="" />
      </Link>
      <div className={communityReviewCardStyles.cardDetails}>
        <h3>{review.reviewTitle}</h3>
        <p>{review.reviewContent}</p>
        <button onClick={handleReviewNav}>Read More</button>
        <p>Written By:
          <Link
            to="/public-profile"
            state={{ profileId: review.author }}
            className={communityReviewCardStyles.userName}
          >
            {formattedUserName}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CommunityReviewCard;