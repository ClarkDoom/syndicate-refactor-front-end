import { useEffect, useState } from "react";

import * as showService from '../../services/showService'
import { Show } from '../../types/models'



import CommunityCard from "../../components/CommunityCard/CommunityCard";

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

  console.log(shows)

  return (
    <div>
      <h1>Community Page</h1>
      {shows.map((show: Show) =>
        <div>
          <CommunityCard show={show}/>
        </div>
      )}
    </div>
  );
}

export default Community;