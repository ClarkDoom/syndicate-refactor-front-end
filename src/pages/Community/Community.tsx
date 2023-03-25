import { useEffect, useState } from "react";

import * as showService from '../../services/showService'
import { Show } from '../../types/models'



import CommunityCard from "../../components/CommunityCard/CommunityCard";

import communityStyles from "./Community.module.css"

const Community = () => {

  const [shows, setShows] = useState([])

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


  return (
    <div className={communityStyles.page}>
      <h1>Community</h1>
      <div className={communityStyles.cardList}>
        {shows.map((show: Show) =>
          <CommunityCard key={show.id} show={show} />
        )}
      </div>
    </div>
  );
}

export default Community;