import { useLocation } from "react-router";
import { useEffect, useState } from "react";

// services
import * as searchService from '../../services/searchService'

const TvShowResult = () => {
  const location = useLocation()
  const result = location.state.result
  console.log(result)

  const [tvShow, setTvShow] = useState<any>({
    name: ""
  })

  useEffect(() => {
    try {
      async function findShow() {
        const response = await searchService.findShow(result.id)
        setTvShow({
          name: response.name
        })
      }
      findShow()
    } catch (err) {
      console.log(err)
    }
  }, [result])


  return (
    <>
      <h1>TvShowResult Page</h1>
      <p>
        {tvShow.name}
      </p>
    </>
  );
}

export default TvShowResult;