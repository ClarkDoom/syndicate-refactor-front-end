import { CommunityCardProps } from '../../types/props'

const CommunityCard = (props: CommunityCardProps) => {

  const { show } = props

  return (
    <div>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
      <h2>
        {show.showName}
      </h2>
      <p>Added By: {show.profile.userName}</p>
      <p>Added To: {show.showType}</p>
    </div>
  );
}

export default CommunityCard;