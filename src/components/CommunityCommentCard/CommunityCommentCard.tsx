import { CommunityCommentCardProps } from '../../types/props'
import communityCommentCardStyles from "./CommunityCommentCard.module.css"

const CommunityCommentCard = (props: CommunityCommentCardProps) => {
  const { comment } = props

  return (
    <div className={communityCommentCardStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${comment.commentFor.reviewOf.imageUrl}`} alt="" />
      <div className={communityCommentCardStyles.cardDetails}>
        <p>{comment.commentBy.userName}</p>
        <p>{comment.reaction}</p>
        <p>{comment.commentText}</p>
      </div>
    </div>
  );
}

export default CommunityCommentCard;