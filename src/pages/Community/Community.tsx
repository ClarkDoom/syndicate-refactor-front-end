import { useEffect, useState } from "react";
import * as showService from '../../services/showService'
import * as reviewService from '../../services/reviewService'
import * as commentService from '../../services/commentService'
import { Show, Review, Comment } from '../../types/models'
import CommunityActivityCard from "../../components/CommunityActivityCard/CommunityActivityCard";
import communityStyles from "./Community.module.css"
import CommunityReviewCard from "../../components/CommunityReviewCard/CommunityReviewCard";
import CommunityCommentCard from "../../components/CommunityCommentCard/CommunityCommentCard";

const Community = () => {

  const [shows, setShows] = useState([])
  const [reviews, setReviews] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    try {
      async function findAllShows() {
        const response = await showService.index()
        setShows(response)
      }
      findAllShows()
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      async function findAllReviews() {
        const response = await reviewService.index()
        setReviews(response)
      }
      findAllReviews()
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      async function findAllComments() {
        const response = await commentService.index()
        setComments(response)
      }
      findAllComments()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className={communityStyles.page}>
      <div className={communityStyles.activity}>
        <h3>Activity</h3>
        {shows.map((show: Show) =>
          <>
            <CommunityActivityCard key={show.id} show={show} />
            <div className={communityStyles.divider}></div>
          </>
        )}
      </div>
      <div className={communityStyles.reviews}>
        <h3>Reviews</h3>
        {reviews.map((review: Review) =>
          <>
            <CommunityReviewCard key={review.id} review={review} />
            <div className={communityStyles.divider}></div>
          </>
        )}
      </div>
      <div className={communityStyles.conversation}>
        <h3>Conversation</h3>
        {comments.map((comment: Comment) =>
          <>
            <CommunityCommentCard key={comment.id} comment={comment} />
            <div className={communityStyles.divider}></div>
          </>
        )}
      </div>
    </div>
  );
}

export default Community;