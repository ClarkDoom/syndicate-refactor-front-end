import { CommunityCommentCardProps } from '../../types/props'
import communityCommentCardStyles from "./CommunityCommentCard.module.css"
import { useNavigate } from 'react-router'

const CommunityCommentCard = (props: CommunityCommentCardProps) => {
  const navigate = useNavigate()
  const { comment } = props

  const formattedUserName =  comment.commentBy.userName.toUpperCase()

  const handleReviewNav = () => {
    navigate('/review', {
      state: {
        review: comment.commentFor,
        show: comment.commentFor.reviewOf
      }
    })
  };

  return (
    <div className={communityCommentCardStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${comment.commentFor.reviewOf.imageUrl}`} alt="" />
      <div className={communityCommentCardStyles.cardDetails}>
        <p>{comment.reaction}</p>
        <p>{comment.commentText}</p>
        <button onClick={handleReviewNav}>Go to Thread</button>
        <p>Comment By: {formattedUserName}</p>
      </div>
    </div>
  );
}

export default CommunityCommentCard;