import { useEffect, useState } from "react";

import * as showService from '../../services/showService'
import { Show } from '../../types/models'

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

  console.log("shows", shows)

  return (
    <>
      <h1>Community Page</h1>
      {shows.map((show: Show) => 
        <p>{show.showName}</p>
        )}
    </>
  );
}

export default Community;