import { CommunityReviewCardProps } from '../../types/props'
import communityReviewCardStyles from "./CommunityReviewCard.module.css"


const CommunityReviewCard = (props: CommunityReviewCardProps) => {

  const { review } = props

  return (
    <div className={communityReviewCardStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${review.reviewOf.imageUrl}`} alt="" />
      <div className={communityReviewCardStyles.cardDetails}>
        <p>{review.reviewTitle}</p>
        <p>{review.reviewContent}</p>
        <p>{review.reviewBy.userName}</p>
      </div>
    </div>
  );
}

export default CommunityReviewCard;