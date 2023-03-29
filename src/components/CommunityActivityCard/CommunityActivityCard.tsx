import { CommunityCardProps } from '../../types/props'
import communityActivityCardStyles from "./CommunityActivityCard.module.css"

const CommunityCard = (props: CommunityCardProps) => {

  const { show } = props

  const formattedShowType = show.showType.toUpperCase()
  const formattedShowName = show.showName.toUpperCase()
  const formattedUserName = show.profile.userName.toUpperCase()

  return (
    <div className={communityActivityCardStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
      <div className={communityActivityCardStyles.cardDetails}>
        <p>@{formattedUserName} added {formattedShowName} to their {formattedShowType} list </p>
      </div>
    </div>
  );
}

export default CommunityCard;