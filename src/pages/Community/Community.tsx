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
  //! remove any type


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
      <div className={communityStyles.headerAndCardList}>
        <h3 className={communityStyles.header}>Activity</h3>
        <div className={communityStyles.activity}>
          {shows.map((show: Show, idx: number) =>
            <div key={idx}>
              <CommunityActivityCard show={show} />
              <div className={communityStyles.divider}></div>
            </div>
          )}
        </div>
      </div>
      <div className={communityStyles.headerAndCardList}>
        <h3 className={communityStyles.header}>Reviews</h3>
        <div className={communityStyles.reviews}>
          {reviews.map((review: Review, idx: number) =>
            <div key={idx}>
              <CommunityReviewCard review={review}/>
              <div className={communityStyles.divider}></div>
            </div>
          )}
        </div>
      </div>
      <div className={communityStyles.headerAndCardList}>
        <h3 className={communityStyles.header}>Conversation</h3>
        <div className={communityStyles.conversation}>
          {comments.map((comment: Comment, idx: number) =>
            <div key={idx} >
              <CommunityCommentCard comment={comment} />
              <div className={communityStyles.divider}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Community;