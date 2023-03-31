import { CommunityCommentCardProps } from '../../types/props'
import communityCommentCardStyles from "./CommunityCommentCard.module.css"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const CommunityCommentCard = (props: CommunityCommentCardProps) => {
  const navigate = useNavigate()
  const { comment } = props

  const formattedUserName = " @" + comment.commentBy.userName.toUpperCase() + " "

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
      <Link to="/tv-show-result" state={{ resultId: comment.commentFor.reviewOf.tmbdShowId }}>
        <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${comment.commentFor.reviewOf.imageUrl}`} alt="" />
      </Link>
      <div className={communityCommentCardStyles.cardDetails}>
        <p>{comment.reaction}</p>
        <p>{comment.commentText}</p>
        <button onClick={handleReviewNav}>Go to Thread</button>
        <p>Comment By:
          <Link 
          to="/public-profile" 
          state={{ profileId: comment.createdBy }}
          className={communityCommentCardStyles.userName}
          >
            {formattedUserName}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CommunityCommentCard;