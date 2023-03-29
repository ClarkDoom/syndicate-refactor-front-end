import { useEffect, useState } from "react";

import * as showService from '../../services/showService'
import * as reviewService from '../../services/reviewService'
import { Show, Review } from '../../types/models'



import CommunityActivityCard from "../../components/CommunityActivityCard/CommunityActivityCard";

import communityStyles from "./Community.module.css"

const Community = () => {

  const [shows, setShows] = useState([])
  const [reviews, setReviews] = useState([])

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

  return (
    <div className={communityStyles.page}>
      <div className={communityStyles.activity}>
        <h3>Activity</h3>
        {shows.map((show: Show) => 
          <CommunityActivityCard show={show} />
        )}
      </div>
      <div className={communityStyles.reviews}>
        <h3>Reviews</h3>
        {reviews.map((review: Review) => 
        <>
          <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${review.reviewOf.imageUrl}`} alt="" />
          <p>{review.reviewTitle}</p>
          <p>{review.reviewContent}</p>
        </>
        )}
      </div>
      <div className={communityStyles.conversation}>Conversation</div>
    </div>
  );
}

export default Community;