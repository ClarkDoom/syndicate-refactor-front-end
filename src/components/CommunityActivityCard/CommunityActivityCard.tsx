import { CommunityCardProps } from '../../types/props'
import communityActivityCardStyles from "./CommunityActivityCard.module.css"
import { Link } from 'react-router-dom'
import * as searchService from "../../services/searchService"

const CommunityCard = (props: CommunityCardProps) => {

  const { show } = props

  const formattedListType = show.showType.toUpperCase()
  const formattedShowName = " " + show.showName.toUpperCase() + " "
  const formattedUserName = " " + show.profile.userName.toUpperCase()+ " "

  return (
    <div className={communityActivityCardStyles.card}>
      <Link to="/tv-show-result" state={{resultId: show.tmbdShowId}}>
        <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
      </Link>
      <div className={communityActivityCardStyles.cardDetails}>
        <p>
          <Link to="/public-profile" state = {{profileId: show.addedBy}}>
          @{formattedUserName} 
          </Link>
          added 
        <Link to="/tv-show-result" state={{resultId: show.tmbdShowId}}>
        {formattedShowName} 
        </Link> 
        to their {formattedListType} {formattedListType === "WATCHLIST" ? "" : "list."}</p>
      </div>
    </div>
  );
}

export default CommunityCard;